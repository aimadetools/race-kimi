#!/usr/bin/env node
/**
 * SchemaLens CI Diff
 * A headless Node.js script for comparing SQL schemas in CI/CD pipelines.
 *
 * Usage:
 *   node schemalens-diff.js schemaA.sql schemaB.sql --dialect=postgres
 *
 * Options:
 *   --dialect=postgres|mysql|sqlite|mssql  (default: postgres)
 *   --format=json|markdown                 (default: json)
 *   --output=file                          (default: stdout)
 *
 * Exit codes:
 *   0 - no differences
 *   1 - differences found
 *   2 - error
 */

const fs = require('fs');
const path = require('path');

// -----------------------------
// Parser (extracted from SchemaLens app.html)
// -----------------------------
function stripComments(sql) {
  sql = sql.replace(/\/\*[\s\S]*?\*\//g, '');
  sql = sql.replace(/--[^\n]*/g, '');
  return sql;
}

function splitStatements(sql) {
  const stmts = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const prev = sql[i - 1];
    if (!inString && (ch === "'" || ch === '"' || ch === '`')) {
      inString = true;
      stringChar = ch;
    } else if (inString && ch === stringChar && prev !== '\\') {
      inString = false;
    }
    if (!inString && ch === ';') {
      stmts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) stmts.push(current.trim());
  return stmts.filter(s => s.length > 0);
}

function tokenize(text) {
  const tokens = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const prev = text[i-1];
    if (!inString && (ch === "'" || ch === '"' || ch === '`')) {
      if (current.trim()) tokens.push(current.trim());
      current = ch;
      inString = true;
      stringChar = ch;
      continue;
    }
    if (inString) {
      current += ch;
      if (ch === stringChar && prev !== '\\') {
        inString = false;
        tokens.push(current);
        current = '';
      }
      continue;
    }
    if (/\s/.test(ch)) {
      if (current.trim()) tokens.push(current.trim());
      current = '';
    } else if (ch === '(' || ch === ')' || ch === ',') {
      if (current.trim()) tokens.push(current.trim());
      tokens.push(ch);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) tokens.push(current.trim());
  return tokens;
}

function splitBody(body) {
  const parts = [];
  let current = '';
  let depth = 0;
  let inString = false;
  let stringChar = '';
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    const prev = body[i-1];
    if (!inString && (ch === "'" || ch === '"' || ch === '`')) {
      inString = true;
      stringChar = ch;
    } else if (inString && ch === stringChar && prev !== '\\') {
      inString = false;
    }
    if (!inString) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 0) {
        parts.push(current.trim());
        current = '';
        continue;
      }
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseColumn(tokens, dialect) {
  const col = {
    name: tokens[0].replace(/["`\[\]]/g, ''),
    type: '',
    nullable: true,
    defaultValue: null,
    primaryKey: false,
    unique: false,
    autoIncrement: false,
    raw: tokens.join(' ')
  };

  let i = 1;
  const typeTokens = [];
  const constraintKeywords = ['NOT','NULL','PRIMARY','KEY','UNIQUE','DEFAULT','AUTO_INCREMENT','AUTOINCREMENT','IDENTITY','REFERENCES','CHECK','COLLATE','COMMENT','ON','CONSTRAINT','FOREIGN','INDEX','KEY','CLUSTERED','NONCLUSTERED','GENERATED','ALWAYS','STORED','VIRTUAL','PERSISTED','TABLESPACE','STORAGE','PCTFREE','INITRANS','MAXTRANS','NOPARALLEL','PARALLEL','LOGGING','NOLOGGING','CACHE','NOCACHE','LOB','PARTITION','SUBPARTITION'];
  while (i < tokens.length) {
    const t = tokens[i].toUpperCase();
    if (t === 'CHARACTER' && tokens[i+1] && tokens[i+1].toUpperCase() === 'SET') {
      typeTokens.push(tokens[i], tokens[i+1]);
      i += 2;
      if (i < tokens.length && !constraintKeywords.includes(tokens[i].toUpperCase())) {
        typeTokens.push(tokens[i]);
        i++;
      }
      continue;
    }
    if (constraintKeywords.includes(t)) break;
    typeTokens.push(tokens[i]);
    i++;
  }
  col.type = typeTokens.join(' ') || 'UNKNOWN';

  while (i < tokens.length) {
    const t = tokens[i].toUpperCase();
    if (t === 'NOT' && tokens[i+1] && tokens[i+1].toUpperCase() === 'NULL') {
      col.nullable = false;
      i += 2;
    } else if (t === 'NULL') {
      col.nullable = true;
      i++;
    } else if (t === 'PRIMARY' && tokens[i+1] && tokens[i+1].toUpperCase() === 'KEY') {
      col.primaryKey = true;
      col.nullable = false;
      i += 2;
      if (tokens[i] && (tokens[i].toUpperCase() === 'CLUSTERED' || tokens[i].toUpperCase() === 'NONCLUSTERED')) i++;
    } else if (t === 'UNIQUE') {
      col.unique = true;
      i++;
    } else if (t === 'DEFAULT') {
      i++;
      const defaultTokens = [];
      const stopWords = ['NOT','NULL','PRIMARY','KEY','UNIQUE','AUTO_INCREMENT','AUTOINCREMENT','IDENTITY','REFERENCES','CHECK','COLLATE','COMMENT','ON','CLUSTERED','NONCLUSTERED','GENERATED','STORED','VIRTUAL','TABLESPACE','STORAGE','PCTFREE','INITRANS','MAXTRANS','NOPARALLEL','PARALLEL','LOGGING','NOLOGGING','CACHE','NOCACHE','LOB','PARTITION','SUBPARTITION'];
      while (i < tokens.length && !stopWords.includes(tokens[i].toUpperCase())) {
        defaultTokens.push(tokens[i]);
        i++;
      }
      col.defaultValue = defaultTokens.join(' ') || null;
    } else if (t === 'AUTO_INCREMENT' || t === 'AUTOINCREMENT') {
      col.autoIncrement = true;
      i++;
    } else if (t === 'IDENTITY') {
      col.autoIncrement = true;
      i++;
      if (tokens[i] === '(') { while (i < tokens.length && tokens[i] !== ')') i++; i++; }
    } else if (t === 'REFERENCES') {
      i++;
      col.foreignKey = { table: '', columns: [] };
      if (tokens[i]) {
        col.foreignKey.table = tokens[i].replace(/["`]/g, '');
        i++;
      }
      if (tokens[i] === '(') {
        i++;
        while (i < tokens.length && tokens[i] !== ')') {
          if (tokens[i] !== ',') col.foreignKey.columns.push(tokens[i].replace(/["`]/g, ''));
          i++;
        }
        i++;
      }
      while (i < tokens.length) {
        const next = tokens[i].toUpperCase();
        if (next === 'ON' || next === 'DEFERRABLE' || next === 'INITIALLY') {
          i++;
          while (i < tokens.length && !['NOT','NULL','PRIMARY','KEY','UNIQUE','DEFAULT','AUTO_INCREMENT','REFERENCES','CHECK','COLLATE','COMMENT','CONSTRAINT'].includes(tokens[i].toUpperCase())) i++;
        } else break;
      }
    } else {
      i++;
    }
  }

  return col;
}

function parseConstraint(tokens, dialect) {
  const con = { raw: tokens.join(' '), type: '', name: null, columns: [] };
  let i = 0;
  if (tokens[i].toUpperCase() === 'CONSTRAINT') {
    i++;
    con.name = tokens[i] ? tokens[i].replace(/["`\[\]]/g, '') : null;
    i++;
  }
  const t = tokens[i] ? tokens[i].toUpperCase() : '';
  if (t === 'PRIMARY') {
    con.type = 'PRIMARY KEY';
    i += 2;
    if (tokens[i] === '(') {
      i++;
      while (i < tokens.length && tokens[i] !== ')') {
        if (tokens[i] !== ',') con.columns.push(tokens[i].replace(/["`\[\]]/g, ''));
        i++;
      }
    }
    if (tokens[i] && (tokens[i].toUpperCase() === 'CLUSTERED' || tokens[i].toUpperCase() === 'NONCLUSTERED')) i++;
  } else if (t === 'UNIQUE') {
    con.type = 'UNIQUE';
    i++;
    if (tokens[i] === '(') {
      i++;
      while (i < tokens.length && tokens[i] !== ')') {
        if (tokens[i] !== ',') con.columns.push(tokens[i].replace(/["`\[\]]/g, ''));
        i++;
      }
    }
  } else if (t === 'FOREIGN') {
    con.type = 'FOREIGN KEY';
    i += 2;
    if (tokens[i] === '(') {
      i++;
      while (i < tokens.length && tokens[i] !== ')') {
        if (tokens[i] !== ',') con.columns.push(tokens[i].replace(/["`\[\]]/g, ''));
        i++;
      }
      i++;
    }
    if (tokens[i] && tokens[i].toUpperCase() === 'REFERENCES') {
      i++;
      con.refTable = tokens[i] ? tokens[i].replace(/["`\[\]]/g, '') : '';
      i++;
      if (tokens[i] === '(') {
        i++;
        con.refColumns = [];
        while (i < tokens.length && tokens[i] !== ')') {
          if (tokens[i] !== ',') con.refColumns.push(tokens[i].replace(/["`\[\]]/g, ''));
          i++;
        }
      }
    }
  } else if (t === 'CHECK') {
    con.type = 'CHECK';
    i++;
    if (tokens[i] === '(') {
      const start = i;
      let depth = 0;
      while (i < tokens.length) {
        if (tokens[i] === '(') depth++;
        else if (tokens[i] === ')') { depth--; if (depth === 0) break; }
        i++;
      }
      con.expression = tokens.slice(start + 1, i).join(' ');
    }
  }
  return con;
}

function parseCreateTable(stmt, dialect) {
  const match = stmt.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w"`\[\]]+(?:\.[\w"`\[\]]+)?)\s*\((.*)\)\s*[^)]*$/is);
  if (!match) return null;

  let tableName = match[1].replace(/["`\[\]]/g, '');
  const rawBody = match[2];

  const table = {
    name: tableName,
    columns: [],
    constraints: [],
    indexes: []
  };

  const parts = splitBody(rawBody);

  for (const part of parts) {
    const tokens = tokenize(part);
    if (tokens.length < 2) continue;

    const firstUpper = tokens[0].toUpperCase();
    if (firstUpper === 'CONSTRAINT' || firstUpper === 'PRIMARY' || firstUpper === 'UNIQUE' || firstUpper === 'FOREIGN' || firstUpper === 'CHECK') {
      table.constraints.push(parseConstraint(tokens, dialect));
      continue;
    }

    const col = parseColumn(tokens, dialect);
    if (col) table.columns.push(col);
  }

  return table;
}

function parseCreateIndex(stmt, dialect) {
  const match = stmt.match(/CREATE\s+(UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w"`\[\]]+)\s+ON\s+([\w"`\[\]]+)\s*\(([^)]+)\)/i);
  if (!match) return null;
  return {
    name: match[2].replace(/["`\[\]]/g, ''),
    table: match[3].replace(/["`\[\]]/g, ''),
    unique: !!match[1],
    columns: match[4].split(',').map(c => c.trim().split(/\s+/)[0].replace(/["`\[\]]/g, ''))
  };
}

function parseCreateEnum(stmt, dialect) {
  const match = stmt.match(/CREATE\s+TYPE\s+([\w"`]+)\s+AS\s+ENUM\s*\(([^)]+)\)/i);
  if (!match) return null;
  return {
    name: match[1].replace(/["`]/g, ''),
    values: match[2].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''))
  };
}

function parseCreateFunction(stmt, dialect) {
  const upper = stmt.toUpperCase();
  if (!upper.includes('CREATE FUNCTION') && !upper.includes('CREATE OR REPLACE FUNCTION') && !upper.includes('CREATE PROCEDURE') && !upper.includes('CREATE OR REPLACE PROCEDURE')) return null;

  const normalized = stmt.replace(/\s+/g, ' ').trim();
  const nameMatch = normalized.match(/(?:FUNCTION|PROCEDURE)\s+([\w".]+)/i);
  if (!nameMatch) return null;
  const name = nameMatch[1].replace(/["]/g, '');

  const funcIdx = normalized.toUpperCase().indexOf('FUNCTION') !== -1 ? normalized.toUpperCase().indexOf('FUNCTION') : normalized.toUpperCase().indexOf('PROCEDURE');
  const afterFunc = normalized.slice(funcIdx);
  const openIdx = afterFunc.indexOf('(');

  let args = '';
  let key = name;
  if (openIdx !== -1) {
    let depth = 1;
    let closeIdx = -1;
    for (let i = openIdx + 1; i < afterFunc.length; i++) {
      if (afterFunc[i] === '(') depth++;
      else if (afterFunc[i] === ')') {
        depth--;
        if (depth === 0) {
          closeIdx = i;
          break;
        }
      }
    }
    args = closeIdx > -1 ? afterFunc.slice(openIdx + 1, closeIdx).trim() : '';
    key = args ? `${name}(${args})` : name;
  }

  const afterArgs = openIdx !== -1 ? afterFunc.slice(afterFunc.indexOf(')', openIdx) + 1).trim() : '';
  const returnsMatch = afterArgs.match(/\bRETURNS\s+(\S+(?:\s+(?!LANGUAGE\b|AS\b|IMMUTABLE\b|STABLE\b|VOLATILE\b|SECURITY\b|SET\b|CALLED\b|RETURNS\b|STRICT\b|PARALLEL\b|COST\b|ROWS\b|WINDOW\b|LEAKPROOF\b|TRANSFORM\b|SUPPORT\b|BEGIN\b|\$\w*\$)[\S]+)*)/i);
  const returns = returnsMatch ? returnsMatch[1].trim() : '';

  const langMatch = afterArgs.match(/\bLANGUAGE\s+(\w+)/i);
  const language = langMatch ? langMatch[1] : '';

  const isProcedure = upper.includes('PROCEDURE');

  return { name, args, key, returns, language, isProcedure, raw: stmt.trim() };
}

function parseCreateView(stmt, dialect) {
  const normalized = stmt.replace(/\s+/g, ' ').trim();
  const match = normalized.match(/CREATE\s+(?:OR\s+REPLACE\s+)?(?:TEMP\s+|TEMPORARY\s+)?VIEW\s+([\w"`\[\]]+)(?:\s*\([^)]+\))?\s+AS\s+(.+)/i);
  if (!match) return null;
  return { name: match[1].replace(/["`\[\]]/g, ''), query: match[2].trim(), raw: stmt.trim() };
}

function parseCreateTrigger(stmt, dialect) {
  const upper = stmt.toUpperCase();
  if (!upper.includes('CREATE TRIGGER') && !upper.includes('CREATE CONSTRAINT TRIGGER')) return null;

  const tokens = tokenize(stmt);
  let i = 0;

  if (tokens[i].toUpperCase() !== 'CREATE') return null;
  i++;

  let constraint = false;
  if (tokens[i].toUpperCase() === 'CONSTRAINT') { constraint = true; i++; }

  if (tokens[i].toUpperCase() !== 'TRIGGER') return null;
  i++;

  const name = tokens[i].replace(/["`\[\]]/g, '');
  i++;

  let timing = '';
  if (tokens[i].toUpperCase() === 'BEFORE') { timing = 'BEFORE'; i++; }
  else if (tokens[i].toUpperCase() === 'AFTER') { timing = 'AFTER'; i++; }
  else if (tokens[i].toUpperCase() === 'INSTEAD' && tokens[i+1] && tokens[i+1].toUpperCase() === 'OF') { timing = 'INSTEAD OF'; i += 2; }
  else return null;

  const events = [];
  while (i < tokens.length) {
    const t = tokens[i].toUpperCase();
    if (['INSERT','UPDATE','DELETE','TRUNCATE'].includes(t)) { events.push(t); i++; }
    else if (t === 'OR') i++;
    else break;
  }

  if (tokens[i].toUpperCase() !== 'ON') return null;
  i++;
  const table = tokens[i].replace(/["`\[\]]/g, '');
  i++;

  while (i < tokens.length) {
    const t = tokens[i].toUpperCase();
    if (t === 'FROM') { i += 2; continue; }
    if (t === 'NOT' && tokens[i+1] && tokens[i+1].toUpperCase() === 'DEFERRABLE') { i += 2; continue; }
    if (t === 'DEFERRABLE') { i++; if (tokens[i] && tokens[i].toUpperCase() === 'INITIALLY') i += 2; continue; }
    if (t === 'INITIALLY') { i += 2; continue; }
    if (t === 'REFERENCING') {
      i++;
      while (i < tokens.length && tokens[i].toUpperCase() !== 'FOR' && tokens[i].toUpperCase() !== 'WHEN' && tokens[i].toUpperCase() !== 'EXECUTE') i++;
      continue;
    }
    break;
  }

  let forEach = 'STATEMENT';
  if (tokens[i] && tokens[i].toUpperCase() === 'FOR') {
    i++;
    if (tokens[i] && tokens[i].toUpperCase() === 'EACH') i++;
    if (tokens[i] && tokens[i].toUpperCase() === 'ROW') { forEach = 'ROW'; i++; }
    else if (tokens[i] && tokens[i].toUpperCase() === 'STATEMENT') { forEach = 'STATEMENT'; i++; }
  }

  let when = null;
  if (tokens[i] && tokens[i].toUpperCase() === 'WHEN') {
    i++;
    if (tokens[i] === '(') {
      i++;
      const start = i;
      let depth = 1;
      while (i < tokens.length && depth > 0) {
        if (tokens[i] === '(') depth++;
        else if (tokens[i] === ')') depth--;
        i++;
      }
      when = tokens.slice(start, i - 1).join(' ');
    }
  }

  if (!tokens[i] || tokens[i].toUpperCase() !== 'EXECUTE') return null;
  i++;
  if (tokens[i] && (tokens[i].toUpperCase() === 'FUNCTION' || tokens[i].toUpperCase() === 'PROCEDURE')) i++;

  const funcName = tokens[i] ? tokens[i].replace(/["`\[\]]/g, '') : '';
  i++;

  let functionArgs = '';
  if (tokens[i] === '(') {
    i++;
    const start = i;
    let depth = 1;
    while (i < tokens.length && depth > 0) {
      if (tokens[i] === '(') depth++;
      else if (tokens[i] === ')') depth--;
      i++;
    }
    functionArgs = tokens.slice(start, i - 1).join(' ');
  }

  return { name, timing, events, table, forEach, when, function: funcName, functionArgs, constraint, raw: stmt.trim() };
}

function parseSQL(sql, dialect) {
  sql = stripComments(sql);
  const statements = splitStatements(sql);
  const schema = { tables: {}, indexes: [], enums: {}, triggers: [], views: {}, errors: [] };

  for (const stmt of statements) {
    const upper = stmt.toUpperCase();
    if (upper.includes('CREATE TABLE')) {
      const table = parseCreateTable(stmt, dialect);
      if (table) {
        schema.tables[table.name] = table;
      } else {
        schema.errors.push({ type: 'parse', stmt: stmt.substring(0, 120) + (stmt.length > 120 ? '...' : ''), msg: 'Could not parse CREATE TABLE statement' });
      }
    } else if (upper.includes('CREATE INDEX') || upper.includes('CREATE UNIQUE INDEX')) {
      const idx = parseCreateIndex(stmt, dialect);
      if (idx) schema.indexes.push(idx);
    } else if (upper.includes('CREATE TYPE') && upper.includes('ENUM')) {
      const em = parseCreateEnum(stmt, dialect);
      if (em) schema.enums[em.name] = em;
    } else if (upper.includes('CREATE TRIGGER')) {
      const tr = parseCreateTrigger(stmt, dialect);
      if (tr) schema.triggers.push(tr);
    } else if (upper.includes('CREATE VIEW') || upper.includes('CREATE OR REPLACE VIEW')) {
      const vw = parseCreateView(stmt, dialect);
      if (vw) schema.views[vw.name] = vw;
    } else if (upper.includes('CREATE FUNCTION') || upper.includes('CREATE OR REPLACE FUNCTION') || upper.includes('CREATE PROCEDURE') || upper.includes('CREATE OR REPLACE PROCEDURE')) {
      const fn = parseCreateFunction(stmt, dialect);
      if (fn) schema.functions[fn.key] = fn;
    }
  }

  for (const idx of schema.indexes) {
    if (schema.tables[idx.table]) {
      if (!schema.tables[idx.table].indexes) schema.tables[idx.table].indexes = [];
      schema.tables[idx.table].indexes.push(idx);
    }
  }

  return schema;
}

// -----------------------------
// Diff Engine
// -----------------------------
function diffSchemas(oldSchema, newSchema) {
  const diff = {
    tablesAdded: [],
    tablesRemoved: [],
    tablesModified: [],
    enumsAdded: [],
    enumsRemoved: [],
    triggersAdded: [],
    triggersRemoved: [],
    triggersModified: [],
    viewsAdded: [],
    viewsRemoved: [],
    viewsModified: [],
    functionsAdded: [],
    functionsRemoved: [],
    functionsModified: [],
    totalTablesOld: Object.keys(oldSchema.tables).length,
    totalTablesNew: Object.keys(newSchema.tables).length
  };

  const oldNames = new Set(Object.keys(oldSchema.tables));
  const newNames = new Set(Object.keys(newSchema.tables));

  for (const name of newNames) {
    if (!oldNames.has(name)) diff.tablesAdded.push(newSchema.tables[name]);
  }
  for (const name of oldNames) {
    if (!newNames.has(name)) diff.tablesRemoved.push(oldSchema.tables[name]);
  }

  for (const name of oldNames) {
    if (newNames.has(name)) {
      const tableDiff = diffTable(oldSchema.tables[name], newSchema.tables[name]);
      if (tableDiff.hasChanges) {
        diff.tablesModified.push(tableDiff);
      }
    }
  }

  const oldEnums = oldSchema.enums || {};
  const newEnums = newSchema.enums || {};
  const oldEnumNames = new Set(Object.keys(oldEnums));
  const newEnumNames = new Set(Object.keys(newEnums));

  for (const name of newEnumNames) {
    if (!oldEnumNames.has(name)) diff.enumsAdded.push(newEnums[name]);
  }
  for (const name of oldEnumNames) {
    if (!newEnumNames.has(name)) diff.enumsRemoved.push(oldEnums[name]);
  }

  const oldTriggers = oldSchema.triggers || [];
  const newTriggers = newSchema.triggers || [];
  const oldTriggerKeys = new Map(oldTriggers.map(t => [`${t.table}.${t.name}`, t]));
  const newTriggerKeys = new Map(newTriggers.map(t => [`${t.table}.${t.name}`, t]));

  for (const [key, tr] of newTriggerKeys) {
    if (!oldTriggerKeys.has(key)) {
      diff.triggersAdded.push(tr);
    } else {
      const oldTr = oldTriggerKeys.get(key);
      const changed = oldTr.timing !== tr.timing ||
        oldTr.events.join(',') !== tr.events.join(',') ||
        oldTr.forEach !== tr.forEach ||
        oldTr.function !== tr.function ||
        oldTr.functionArgs !== tr.functionArgs ||
        oldTr.when !== tr.when ||
        oldTr.constraint !== tr.constraint;
      if (changed) diff.triggersModified.push({ oldTrigger: oldTr, newTrigger: tr });
    }
  }
  for (const [key, tr] of oldTriggerKeys) {
    if (!newTriggerKeys.has(key)) diff.triggersRemoved.push(tr);
  }

  const oldViews = oldSchema.views || {};
  const newViews = newSchema.views || {};
  const oldViewNames = new Set(Object.keys(oldViews));
  const newViewNames = new Set(Object.keys(newViews));

  for (const name of newViewNames) {
    if (!oldViewNames.has(name)) diff.viewsAdded.push(newViews[name]);
    else if (oldViews[name].query !== newViews[name].query) {
      diff.viewsModified.push({ oldView: oldViews[name], newView: newViews[name] });
    }
  }
  for (const name of oldViewNames) {
    if (!newViewNames.has(name)) diff.viewsRemoved.push(oldViews[name]);
  }

  // Function diff
  const oldFunctions = oldSchema.functions || {};
  const newFunctions = newSchema.functions || {};
  const oldFunctionKeys = new Set(Object.keys(oldFunctions));
  const newFunctionKeys = new Set(Object.keys(newFunctions));

  for (const key of newFunctionKeys) {
    if (!oldFunctionKeys.has(key)) diff.functionsAdded.push(newFunctions[key]);
    else if (oldFunctions[key].raw !== newFunctions[key].raw) {
      diff.functionsModified.push({ oldFunction: oldFunctions[key], newFunction: newFunctions[key] });
    }
  }
  for (const key of oldFunctionKeys) {
    if (!newFunctionKeys.has(key)) diff.functionsRemoved.push(oldFunctions[key]);
  }

  return diff;
}

function diffTable(oldTable, newTable) {
  const result = {
    name: oldTable.name,
    oldTable: oldTable,
    newTable: newTable,
    hasChanges: false,
    columnsAdded: [],
    columnsRemoved: [],
    columnsModified: [],
    constraintsChanged: false
  };

  const oldCols = Object.fromEntries(oldTable.columns.map(c => [c.name, c]));
  const newCols = Object.fromEntries(newTable.columns.map(c => [c.name, c]));

  for (const col of newTable.columns) {
    if (!oldCols[col.name]) {
      result.columnsAdded.push(col);
      result.hasChanges = true;
    }
  }
  for (const col of oldTable.columns) {
    if (!newCols[col.name]) {
      result.columnsRemoved.push(col);
      result.hasChanges = true;
    }
  }
  for (const col of newTable.columns) {
    const oldCol = oldCols[col.name];
    if (oldCol) {
      const changes = [];
      if (oldCol.type.toUpperCase() !== col.type.toUpperCase()) changes.push({ field: 'type', old: oldCol.type, new: col.type });
      if (oldCol.nullable !== col.nullable) changes.push({ field: 'nullable', old: oldCol.nullable ? 'NULL' : 'NOT NULL', new: col.nullable ? 'NULL' : 'NOT NULL' });
      if ((oldCol.defaultValue || null) !== (col.defaultValue || null)) changes.push({ field: 'default', old: oldCol.defaultValue || 'none', new: col.defaultValue || 'none' });
      if (oldCol.primaryKey !== col.primaryKey) changes.push({ field: 'primary key', old: oldCol.primaryKey ? 'YES' : 'NO', new: col.primaryKey ? 'YES' : 'NO' });
      if (oldCol.unique !== col.unique) changes.push({ field: 'unique', old: oldCol.unique ? 'YES' : 'NO', new: col.unique ? 'YES' : 'NO' });
      if (changes.length > 0) {
        result.columnsModified.push({ column: col, changes });
        result.hasChanges = true;
      }
    }
  }

  const oldCons = oldTable.constraints;
  const newCons = newTable.constraints;
  result.constraintsAdded = [];
  result.constraintsRemoved = [];

  function conKey(c) {
    return (c.type || '') + '|' + (c.name || '') + '|' + (c.columns ? c.columns.join(',') : '') + '|' + (c.refTable || '') + '|' + (c.refColumns ? c.refColumns.join(',') : '') + '|' + (c.expression || '');
  }

  const oldMap = new Map(oldCons.map(c => [conKey(c), c]));
  const newMap = new Map(newCons.map(c => [conKey(c), c]));

  for (const c of newCons) {
    if (!oldMap.has(conKey(c))) result.constraintsAdded.push(c);
  }
  for (const c of oldCons) {
    if (!newMap.has(conKey(c))) result.constraintsRemoved.push(c);
  }

  if (result.constraintsAdded.length || result.constraintsRemoved.length) {
    result.constraintsChanged = true;
    result.hasChanges = true;
  }

  return result;
}

function detectBreakingChanges(diff) {
  const breaking = [];
  for (const table of diff.tablesRemoved) {
    breaking.push({ type: 'DROP_TABLE', severity: 'critical', table: table.name, details: `Table "${table.name}" was removed` });
  }
  for (const td of diff.tablesModified) {
    for (const col of td.columnsRemoved) {
      breaking.push({ type: 'DROP_COLUMN', severity: 'critical', table: td.name, column: col.name, details: `Column "${col.name}" was removed from "${td.name}"` });
    }
    for (const col of td.columnsAdded) {
      if (!col.nullable && !col.defaultValue) {
        breaking.push({ type: 'ADD_NOT_NULL_NO_DEFAULT', severity: 'critical', table: td.name, column: col.name, details: `Column "${col.name}" in "${td.name}" is NOT NULL with no default` });
      }
    }
    for (const mod of td.columnsModified) {
      const typeChange = mod.changes.find(c => c.field === 'type');
      if (!typeChange) continue;
      const oldT = typeChange.old.toUpperCase();
      const newT = typeChange.new.toUpperCase();
      let narrowed = false;
      const oldVar = oldT.match(/^(?:N?VAR)?CHAR\s*\(\s*(\d+)\s*\)/);
      const newVar = newT.match(/^(?:N?VAR)?CHAR\s*\(\s*(\d+)\s*\)/);
      if (oldVar && newVar && parseInt(newVar[1]) < parseInt(oldVar[1])) narrowed = true;
      if (oldT.includes('BIGINT') && (newT.includes('INT') || newT.includes('SMALLINT') || newT.includes('TINYINT'))) narrowed = true;
      if (oldT.includes('INT') && !oldT.includes('BIGINT') && (newT.includes('SMALLINT') || newT.includes('TINYINT'))) narrowed = true;
      if (oldT.includes('SMALLINT') && newT.includes('TINYINT')) narrowed = true;
      if ((oldT.includes('TEXT') || oldT.includes('CLOB')) && (newT.includes('VARCHAR') || newT.includes('CHAR'))) narrowed = true;
      const oldDec = oldT.match(/DECIMAL\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
      const newDec = newT.match(/DECIMAL\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
      if (oldDec && newDec) {
        if (parseInt(newDec[1]) < parseInt(oldDec[1]) || parseInt(newDec[2]) < parseInt(oldDec[2])) narrowed = true;
      }
      if (narrowed) {
        breaking.push({ type: 'NARROW_TYPE', severity: 'warning', table: td.name, column: mod.column.name, details: `Column "${mod.column.name}" in "${td.name}" narrowed from ${typeChange.old} to ${typeChange.new}` });
      }
    }
    for (const con of td.constraintsRemoved) {
      const type = (con.type || '').toUpperCase();
      if (type.includes('PRIMARY') || type.includes('UNIQUE') || type.includes('CHECK')) {
        breaking.push({ type: 'DROP_CONSTRAINT', severity: 'critical', table: td.name, details: `Dropped ${con.type}${con.name ? ' "' + con.name + '"' : ''} from "${td.name}"` });
      }
    }
    for (const con of td.constraintsAdded) {
      const type = (con.type || '').toUpperCase();
      if (type.includes('FOREIGN')) {
        const fkCols = con.columns || [];
        const hasIndex = (td.newTable && td.newTable.indexes || []).some(idx =>
          idx.columns.length >= fkCols.length && fkCols.every((c, i) => idx.columns[i] === c)
        );
        if (!hasIndex) {
          breaking.push({ type: 'ADD_FK_NO_INDEX', severity: 'warning', table: td.name, details: `Foreign key on "${td.name}"(${fkCols.join(', ')}) has no supporting index` });
        }
      }
    }
  }
  return breaking;
}

// -----------------------------
// CLI
// -----------------------------
function printUsage() {
  console.log(`Usage: node schemalens-diff.js <schemaA.sql> <schemaB.sql> [options]

Options:
  --dialect=postgres|mysql|sqlite|mssql|oracle   SQL dialect (default: postgres)
  --format=json|markdown                  Output format (default: json)
  --output=<file>                         Write output to file (default: stdout)
  --fail-on-breaking                      Exit with code 3 if breaking changes detected
  --help                                  Show this help message

Exit codes:
  0 - no differences
  1 - differences found (non-breaking)
  2 - error
  3 - breaking changes detected (with --fail-on-breaking)
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  let fileA = null;
  let fileB = null;
  let dialect = 'postgres';
  let format = 'json';
  let outputFile = null;
  let failOnBreaking = false;

  for (const arg of args) {
    if (arg.startsWith('--dialect=')) {
      dialect = arg.split('=')[1];
    } else if (arg.startsWith('--format=')) {
      format = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      outputFile = arg.split('=')[1];
    } else if (arg === '--fail-on-breaking') {
      failOnBreaking = true;
    } else if (!fileA) {
      fileA = arg;
    } else if (!fileB) {
      fileB = arg;
    }
  }

  if (!fileA || !fileB) {
    console.error('Error: Two schema files are required.');
    printUsage();
    process.exit(2);
  }

  if (!['postgres', 'mysql', 'sqlite', 'mssql', 'oracle'].includes(dialect)) {
    console.error(`Error: Unsupported dialect "${dialect}".`);
    process.exit(2);
  }

  if (!['json', 'markdown'].includes(format)) {
    console.error(`Error: Unsupported format "${format}".`);
    process.exit(2);
  }

  let sqlA, sqlB;
  try {
    sqlA = fs.readFileSync(fileA, 'utf8');
    sqlB = fs.readFileSync(fileB, 'utf8');
  } catch (e) {
    console.error(`Error reading files: ${e.message}`);
    process.exit(2);
  }

  let schemaA, schemaB, diff;
  try {
    schemaA = parseSQL(sqlA, dialect);
    schemaB = parseSQL(sqlB, dialect);
    diff = diffSchemas(schemaA, schemaB);
  } catch (e) {
    console.error(`Error parsing schemas: ${e.message}`);
    process.exit(2);
  }

  const breakingChanges = detectBreakingChanges(diff);
  diff.breakingChanges = breakingChanges;

  let output;
  if (format === 'json') {
    output = JSON.stringify(diff, null, 2);
  } else {
    output = generateMarkdown(diff, dialect);
  }

  if (outputFile) {
    try {
      fs.writeFileSync(outputFile, output);
      console.log(`Output written to ${outputFile}`);
    } catch (e) {
      console.error(`Error writing output: ${e.message}`);
      process.exit(2);
    }
  } else {
    console.log(output);
  }

  const hasDiff = diff.tablesAdded.length > 0 || diff.tablesRemoved.length > 0 || diff.tablesModified.length > 0 || diff.enumsAdded.length > 0 || diff.enumsRemoved.length > 0 || diff.triggersAdded.length > 0 || diff.triggersRemoved.length > 0 || diff.triggersModified.length > 0 || diff.viewsAdded.length > 0 || diff.viewsRemoved.length > 0 || diff.viewsModified.length > 0 || diff.functionsAdded.length > 0 || diff.functionsRemoved.length > 0 || diff.functionsModified.length > 0;
  if (failOnBreaking && breakingChanges.length > 0) {
    process.exit(3);
  }
  process.exit(hasDiff ? 1 : 0);
}

function generateMarkdown(diff, dialect) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const dialectName = dialect === 'postgres' ? 'PostgreSQL' : dialect === 'mysql' ? 'MySQL / MariaDB' : dialect === 'mssql' ? 'SQL Server' : dialect === 'oracle' ? 'Oracle' : 'SQLite';
  let md = `# Schema Diff Report\n\n`;
  md += `**Generated:** ${now}  \n`;
  md += `**Dialect:** ${dialectName}  \n\n`;

  md += `## Summary\n\n`;
  md += `- Tables in old schema: ${diff.totalTablesOld}\n`;
  md += `- Tables in new schema: ${diff.totalTablesNew}\n`;
  md += `- Tables added: ${diff.tablesAdded.length}\n`;
  md += `- Tables removed: ${diff.tablesRemoved.length}\n`;
  md += `- Tables modified: ${diff.tablesModified.length}\n\n`;

  if (diff.tablesAdded.length) {
    md += `## Tables Added\n\n`;
    for (const table of diff.tablesAdded) {
      md += `### ${table.name}\n\n`;
      md += `| Column | Type | Null | Default |\n`;
      md += `|--------|------|------|---------|\n`;
      for (const col of table.columns) {
        md += `| ${col.name} | ${col.type} | ${col.nullable ? 'NULL' : 'NOT NULL'} | ${col.defaultValue || '—'} |\n`;
      }
      md += `\n`;
    }
  }

  if (diff.tablesRemoved.length) {
    md += `## Tables Removed\n\n`;
    for (const table of diff.tablesRemoved) {
      md += `### ${table.name}\n\n`;
      md += `| Column | Type | Null | Default |\n`;
      md += `|--------|------|------|---------|\n`;
      for (const col of table.columns) {
        md += `| ${col.name} | ${col.type} | ${col.nullable ? 'NULL' : 'NOT NULL'} | ${col.defaultValue || '—'} |\n`;
      }
      md += `\n`;
    }
  }

  if (diff.tablesModified.length) {
    md += `## Tables Modified\n\n`;
    for (const td of diff.tablesModified) {
      md += `### ${td.name}\n\n`;

      if (td.columnsAdded.length) {
        md += `**Columns added:**\n\n`;
        md += `| Column | Type | Null | Default |\n`;
        md += `|--------|------|------|---------|\n`;
        for (const col of td.columnsAdded) {
          md += `| ${col.name} | ${col.type} | ${col.nullable ? 'NULL' : 'NOT NULL'} | ${col.defaultValue || '—'} |\n`;
        }
        md += `\n`;
      }

      if (td.columnsRemoved.length) {
        md += `**Columns removed:**\n\n`;
        md += `| Column | Type | Null | Default |\n`;
        md += `|--------|------|------|---------|\n`;
        for (const col of td.columnsRemoved) {
          md += `| ${col.name} | ${col.type} | ${col.nullable ? 'NULL' : 'NOT NULL'} | ${col.defaultValue || '—'} |\n`;
        }
        md += `\n`;
      }

      if (td.columnsModified.length) {
        md += `**Columns modified:**\n\n`;
        md += `| Column | Changes |\n`;
        md += `|--------|---------|\n`;
        for (const mod of td.columnsModified) {
          const changes = mod.changes.map(c => `${c.field}: ${c.old} → ${c.new}`).join('; ');
          md += `| ${mod.column.name} | ${changes} |\n`;
        }
        md += `\n`;
      }

      if (td.constraintsAdded && td.constraintsAdded.length) {
        md += `**Constraints added:**\n\n`;
        for (const con of td.constraintsAdded) {
          if (con.type === 'FOREIGN KEY') {
            md += `- ${con.name || 'unnamed'}: FOREIGN KEY (${con.columns.join(', ')}) REFERENCES ${con.refTable}(${(con.refColumns || []).join(', ')})\n`;
          } else if (con.type === 'CHECK') {
            md += `- ${con.name || 'unnamed'}: CHECK (${con.expression})\n`;
          } else {
            md += `- ${con.name || 'unnamed'}: ${con.type} (${con.columns.join(', ')})\n`;
          }
        }
        md += `\n`;
      }

      if (td.constraintsRemoved && td.constraintsRemoved.length) {
        md += `**Constraints removed:**\n\n`;
        for (const con of td.constraintsRemoved) {
          if (con.type === 'FOREIGN KEY') {
            md += `- ${con.name || 'unnamed'}: FOREIGN KEY (${con.columns.join(', ')}) REFERENCES ${con.refTable}(${(con.refColumns || []).join(', ')})\n`;
          } else if (con.type === 'CHECK') {
            md += `- ${con.name || 'unnamed'}: CHECK (${con.expression})\n`;
          } else {
            md += `- ${con.name || 'unnamed'}: ${con.type} (${con.columns.join(', ')})\n`;
          }
        }
        md += `\n`;
      }
    }
  }

  if (diff.enumsAdded && diff.enumsAdded.length) {
    md += `## Enums Added\n\n`;
    for (const en of diff.enumsAdded) {
      md += `- **${en.name}:** ${en.values.join(', ')}\n`;
    }
    md += `\n`;
  }

  if (diff.enumsRemoved && diff.enumsRemoved.length) {
    md += `## Enums Removed\n\n`;
    for (const en of diff.enumsRemoved) {
      md += `- **${en.name}:** ${en.values.join(', ')}\n`;
    }
    md += `\n`;
  }

  if (diff.triggersAdded && diff.triggersAdded.length) {
    md += `## Triggers Added\n\n`;
    for (const tr of diff.triggersAdded) {
      md += `### ${tr.name} (on ${tr.table})\n\n`;
      md += `- **Timing:** ${tr.timing}\n`;
      md += `- **Events:** ${tr.events.join(', ')}\n`;
      md += `- **For Each:** ${tr.forEach}\n`;
      md += `- **Function:** ${tr.function}(${tr.functionArgs})\n`;
      if (tr.when) md += `- **WHEN:** ${tr.when}\n`;
      md += `\n`;
    }
  }

  if (diff.triggersRemoved && diff.triggersRemoved.length) {
    md += `## Triggers Removed\n\n`;
    for (const tr of diff.triggersRemoved) {
      md += `### ${tr.name} (on ${tr.table})\n\n`;
      md += `- **Timing:** ${tr.timing}\n`;
      md += `- **Events:** ${tr.events.join(', ')}\n`;
      md += `- **For Each:** ${tr.forEach}\n`;
      md += `- **Function:** ${tr.function}(${tr.functionArgs})\n`;
      if (tr.when) md += `- **WHEN:** ${tr.when}\n`;
      md += `\n`;
    }
  }

  if (diff.triggersModified && diff.triggersModified.length) {
    md += `## Triggers Modified\n\n`;
    for (const tm of diff.triggersModified) {
      md += `### ${tm.newTrigger.name} (on ${tm.newTrigger.table})\n\n`;
      md += `- **Timing:** ${tm.oldTrigger.timing} → ${tm.newTrigger.timing}\n`;
      md += `- **Events:** ${tm.oldTrigger.events.join(', ')} → ${tm.newTrigger.events.join(', ')}\n`;
      md += `- **For Each:** ${tm.oldTrigger.forEach} → ${tm.newTrigger.forEach}\n`;
      md += `- **Function:** ${tm.oldTrigger.function} → ${tm.newTrigger.function}(${tm.newTrigger.functionArgs})\n`;
      md += `\n`;
    }
  }

  if (diff.viewsAdded && diff.viewsAdded.length) {
    md += `## Views Added\n\n`;
    for (const vw of diff.viewsAdded) {
      md += `### ${vw.name}\n\n`;
      md += `\`\`\`sql\n${vw.query}\n\`\`\`\n\n`;
    }
  }

  if (diff.viewsRemoved && diff.viewsRemoved.length) {
    md += `## Views Removed\n\n`;
    for (const vw of diff.viewsRemoved) {
      md += `### ${vw.name}\n\n`;
      md += `\`\`\`sql\n${vw.query}\n\`\`\`\n\n`;
    }
  }

  if (diff.viewsModified && diff.viewsModified.length) {
    md += `## Views Modified\n\n`;
    for (const vm of diff.viewsModified) {
      md += `### ${vm.newView.name}\n\n`;
      md += `**Old query:**\n\`\`\`sql\n${vm.oldView.query}\n\`\`\`\n\n`;
      md += `**New query:**\n\`\`\`sql\n${vm.newView.query}\n\`\`\`\n\n`;
    }
  }

  if (diff.functionsAdded && diff.functionsAdded.length) {
    md += `## Functions Added\n\n`;
    for (const fn of diff.functionsAdded) {
      md += `### ${fn.name}${fn.args ? '(' + fn.args + ')' : ''}\n\n`;
      if (fn.returns) md += `- **Returns:** ${fn.returns}\n`;
      if (fn.language) md += `- **Language:** ${fn.language}\n`;
      md += `\`\`\`sql\n${fn.raw}\n\`\`\`\n\n`;
    }
  }

  if (diff.functionsRemoved && diff.functionsRemoved.length) {
    md += `## Functions Removed\n\n`;
    for (const fn of diff.functionsRemoved) {
      md += `### ${fn.name}${fn.args ? '(' + fn.args + ')' : ''}\n\n`;
      if (fn.returns) md += `- **Returns:** ${fn.returns}\n`;
      if (fn.language) md += `- **Language:** ${fn.language}\n`;
      md += `\`\`\`sql\n${fn.raw}\n\`\`\`\n\n`;
    }
  }

  if (diff.functionsModified && diff.functionsModified.length) {
    md += `## Functions Modified\n\n`;
    for (const fm of diff.functionsModified) {
      md += `### ${fm.newFunction.name}${fm.newFunction.args ? '(' + fm.newFunction.args + ')' : ''}\n\n`;
      md += `**Old:**\n\`\`\`sql\n${fm.oldFunction.raw}\n\`\`\`\n\n`;
      md += `**New:**\n\`\`\`sql\n${fm.newFunction.raw}\n\`\`\`\n\n`;
    }
  }

  md += `---\n\n`;
  md += `*Generated by SchemaLens CI — https://schemalens.vercel.app*`;
  return md;
}

main();
