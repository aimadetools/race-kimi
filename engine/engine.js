/**
 * SchemaLens Engine
 * Shared SQL parser, diff engine, and migration generator.
 * Used by CLI, API, and test suites.
 */

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
  const schema = { tables: {}, indexes: [], enums: {}, triggers: [], views: {}, functions: {}, errors: [] };

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
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function normalizeName(name) {
  return name.toLowerCase().replace(/[_\-]/g, '');
}

function isRenameCandidate(oldCol, newCol) {
  if (oldCol.type.toUpperCase() !== newCol.type.toUpperCase()) return false;
  const dist = levenshteinDistance(oldCol.name.toLowerCase(), newCol.name.toLowerCase());
  if (dist <= 2) return true;
  if (normalizeName(oldCol.name) === normalizeName(newCol.name)) return true;
  const o = oldCol.name.toLowerCase();
  const n = newCol.name.toLowerCase();
  if (o.includes(n) || n.includes(o)) return true;
  return false;
}

function tableSignature(table) {
  const colSig = table.columns.map(c => c.type.toUpperCase()).join('|');
  const conSig = (table.constraints || []).map(c => (c.type || '') + ':' + (c.columns ? c.columns.join(',') : '')).join('|');
  return colSig + '##' + conSig;
}

function isTableRenameCandidate(oldTable, newTable) {
  const oldSig = tableSignature(oldTable);
  const newSig = tableSignature(newTable);
  if (oldSig !== newSig) return false;
  const dist = levenshteinDistance(oldTable.name.toLowerCase(), newTable.name.toLowerCase());
  if (dist <= 3) return true;
  if (normalizeName(oldTable.name) === normalizeName(newTable.name)) return true;
  const o = oldTable.name.toLowerCase();
  const n = newTable.name.toLowerCase();
  if (o.includes(n) || n.includes(o)) return true;
  return false;
}

function diffTable(oldTable, newTable) {
  const result = {
    name: oldTable.name,
    oldTable: oldTable,
    newTable: newTable,
    hasChanges: false,
    columnsAdded: [],
    columnsRemoved: [],
    columnsRenamed: [],
    columnsModified: [],
    constraintsChanged: false
  };

  const oldCols = Object.fromEntries(oldTable.columns.map(c => [c.name, c]));
  const newCols = Object.fromEntries(newTable.columns.map(c => [c.name, c]));

  const added = [];
  const removed = [];

  for (const col of newTable.columns) {
    if (!oldCols[col.name]) {
      added.push(col);
    }
  }
  for (const col of oldTable.columns) {
    if (!newCols[col.name]) {
      removed.push(col);
    }
  }

  const renameMatches = new Set();
  for (const oldCol of removed) {
    let bestMatch = null;
    let bestScore = Infinity;
    for (const newCol of added) {
      if (renameMatches.has(newCol.name)) continue;
      if (isRenameCandidate(oldCol, newCol)) {
        const score = levenshteinDistance(oldCol.name.toLowerCase(), newCol.name.toLowerCase());
        if (score < bestScore) {
          bestScore = score;
          bestMatch = newCol;
        }
      }
    }
    if (bestMatch) {
      result.columnsRenamed.push({ oldColumn: oldCol, newColumn: bestMatch });
      renameMatches.add(bestMatch.name);
      result.hasChanges = true;
    } else {
      result.columnsRemoved.push(oldCol);
      result.hasChanges = true;
    }
  }
  for (const newCol of added) {
    if (!renameMatches.has(newCol.name)) {
      result.columnsAdded.push(newCol);
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

function diffSchemas(oldSchema, newSchema) {
  const diff = {
    tablesAdded: [],
    tablesRemoved: [],
    tablesRenamed: [],
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

  const added = [];
  const removed = [];

  for (const name of newNames) {
    if (!oldNames.has(name)) added.push(newSchema.tables[name]);
  }
  for (const name of oldNames) {
    if (!newNames.has(name)) removed.push(oldSchema.tables[name]);
  }

  const renameMatches = new Set();
  for (const oldTable of removed) {
    let bestMatch = null;
    let bestScore = Infinity;
    for (const newTable of added) {
      if (renameMatches.has(newTable.name)) continue;
      if (isTableRenameCandidate(oldTable, newTable)) {
        const score = levenshteinDistance(oldTable.name.toLowerCase(), newTable.name.toLowerCase());
        if (score < bestScore) {
          bestScore = score;
          bestMatch = newTable;
        }
      }
    }
    if (bestMatch) {
      diff.tablesRenamed.push({ oldTable, newTable: bestMatch });
      renameMatches.add(bestMatch.name);
    } else {
      diff.tablesRemoved.push(oldTable);
    }
  }
  for (const newTable of added) {
    if (!renameMatches.has(newTable.name)) {
      diff.tablesAdded.push(newTable);
    }
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

function calculateRiskScore(diff) {
  const breaking = detectBreakingChanges(diff);
  let score = 0;
  const weights = {
    'DROP_TABLE': 25,
    'DROP_COLUMN': 20,
    'ADD_NOT_NULL_NO_DEFAULT': 20,
    'DROP_CONSTRAINT': 15,
    'NARROW_TYPE': 10,
    'ADD_FK_NO_INDEX': 10
  };
  for (const b of breaking) {
    score += weights[b.type] || 10;
  }
  score = Math.min(100, score);

  let label, color, icon;
  if (score === 0) { label = 'Safe'; color = 'var(--success)'; icon = '✓'; }
  else if (score <= 25) { label = 'Low Risk'; color = 'var(--success)'; icon = '✓'; }
  else if (score <= 50) { label = 'Medium Risk'; color = 'var(--warning)'; icon = '◐'; }
  else if (score <= 75) { label = 'High Risk'; color = 'var(--danger)'; icon = '⚠'; }
  else { label = 'Critical Risk'; color = 'var(--danger)'; icon = '🔴'; }

  return { score, label, color, icon, breaking };
}

// -----------------------------
// Migration Generation
// -----------------------------
function quoteId(name, dialect) {
  if (dialect === 'mysql') return '`' + name + '`';
  if (dialect === 'postgres') return '"' + name + '"';
  if (dialect === 'mssql') return '[' + name + ']';
  if (dialect === 'oracle') return '"' + name + '"';
  return `"${name}"`;
}

function columnDefSQL(col, dialect) {
  let sql = quoteId(col.name, dialect) + ' ' + col.type;
  if (!col.nullable) sql += ' NOT NULL';
  if (col.primaryKey) sql += ' PRIMARY KEY';
  if (col.unique) sql += ' UNIQUE';
  if (col.defaultValue) sql += ' DEFAULT ' + col.defaultValue;
  if (col.autoIncrement) {
    if (dialect === 'mysql') sql += ' AUTO_INCREMENT';
    else if (dialect === 'sqlite') sql += ' AUTOINCREMENT';
    else if (dialect === 'mssql') sql += ' IDENTITY(1,1)';
    else if (dialect === 'oracle') sql += ' GENERATED ALWAYS AS IDENTITY';
    else sql += ' GENERATED ALWAYS AS IDENTITY';
  }
  return sql;
}

function generateMigration(diff, dialect) {
  const lines = [];

  for (const table of diff.tablesRemoved) {
    if (dialect === 'sqlite') {
      lines.push(`-- SQLite: DROP TABLE is destructive. Back up your data first.`);
    }
    lines.push(`DROP TABLE ${quoteId(table.name, dialect)};`);
    lines.push('');
  }

  for (const ren of diff.tablesRenamed || []) {
    if (dialect === 'postgres' || dialect === 'sqlite') {
      lines.push(`ALTER TABLE ${quoteId(ren.oldTable.name, dialect)} RENAME TO ${quoteId(ren.newTable.name, dialect)};`);
    } else if (dialect === 'mysql') {
      lines.push(`RENAME TABLE ${quoteId(ren.oldTable.name, dialect)} TO ${quoteId(ren.newTable.name, dialect)};`);
    } else if (dialect === 'mssql') {
      lines.push(`EXEC sp_rename '${quoteId(ren.oldTable.name, dialect).replace(/[[\]]/g, '')}', '${ren.newTable.name}';`);
    } else if (dialect === 'oracle') {
      lines.push(`RENAME ${quoteId(ren.oldTable.name, dialect)} TO ${quoteId(ren.newTable.name, dialect)};`);
    }
  }
  if (diff.tablesRenamed && diff.tablesRenamed.length) lines.push('');

  for (const table of diff.tablesAdded) {
    lines.push(`-- New table: ${table.name}`);
    lines.push(`CREATE TABLE ${quoteId(table.name, dialect)} (`);
    const colLines = table.columns.map(c => '  ' + columnDefSQL(c, dialect));
    if (table.constraints.length) {
      for (const con of table.constraints) {
        colLines.push('  ' + con.raw);
      }
    }
    lines.push(colLines.join(',\n'));
    lines.push(`);`);
    lines.push('');
  }

  for (const td of diff.tablesModified) {
    lines.push(`-- Changes in table: ${td.name}`);

    for (const col of td.columnsRemoved) {
      if (dialect === 'sqlite') {
        lines.push(`-- SQLite does not support DROP COLUMN directly.`);
        lines.push(`-- You must recreate the table. See: https://sqlite.org/lang_altertable.html`);
        lines.push(`-- ALTER TABLE ${quoteId(td.name, dialect)} DROP COLUMN ${quoteId(col.name, dialect)}; -- NOT SUPPORTED`);
      } else {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP COLUMN ${quoteId(col.name, dialect)};`);
      }
    }
    if (td.columnsRemoved.length) lines.push('');

    for (const ren of td.columnsRenamed) {
      if (dialect === 'postgres' || dialect === 'sqlite') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} RENAME COLUMN ${quoteId(ren.oldColumn.name, dialect)} TO ${quoteId(ren.newColumn.name, dialect)};`);
      } else if (dialect === 'mysql') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} CHANGE COLUMN ${quoteId(ren.oldColumn.name, dialect)} ${columnDefSQL(ren.newColumn, dialect)};`);
      } else if (dialect === 'mssql') {
        lines.push(`EXEC sp_rename '${quoteId(td.name, dialect).replace(/[[\]]/g, '')}.${quoteId(ren.oldColumn.name, dialect).replace(/[[\]]/g, '')}', '${ren.newColumn.name}', 'COLUMN';`);
      } else if (dialect === 'oracle') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} RENAME COLUMN ${quoteId(ren.oldColumn.name, dialect)} TO ${quoteId(ren.newColumn.name, dialect)};`);
      }
    }
    if (td.columnsRenamed.length) lines.push('');

    for (const col of td.columnsAdded) {
      if (dialect === 'sqlite') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD COLUMN ${columnDefSQL(col, dialect)};`);
      } else {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD ${columnDefSQL(col, dialect)};`);
      }
    }
    if (td.columnsAdded.length) lines.push('');

    for (const mod of td.columnsModified) {
      const col = mod.column;
      for (const change of mod.changes) {
        if (change.field === 'type') {
          if (dialect === 'postgres') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} TYPE ${col.type};`);
          } else if (dialect === 'mysql') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY COLUMN ${columnDefSQL(col, dialect)};`);
          } else if (dialect === 'mssql') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} ${col.type}${col.nullable ? '' : ' NOT NULL'};`);
          } else if (dialect === 'oracle') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY (${quoteId(col.name, dialect)} ${col.type});`);
          } else {
            lines.push(`-- SQLite: type changes require table recreation`);
            lines.push(`-- ALTER TABLE ${quoteId(td.name, dialect)} ... -- NOT SUPPORTED`);
          }
        } else if (change.field === 'nullable') {
          if (dialect === 'postgres') {
            if (col.nullable) {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} DROP NOT NULL;`);
            } else {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} SET NOT NULL;`);
            }
          } else if (dialect === 'mysql') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY COLUMN ${columnDefSQL(col, dialect)};`);
          } else if (dialect === 'mssql') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} ${col.type}${col.nullable ? '' : ' NOT NULL'};`);
          } else if (dialect === 'oracle') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY (${quoteId(col.name, dialect)} ${col.nullable ? '' : 'NOT NULL'});`);
          } else {
            lines.push(`-- SQLite: nullability changes require table recreation`);
          }
        } else if (change.field === 'default') {
          if (dialect === 'postgres') {
            if (col.defaultValue) {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} SET DEFAULT ${col.defaultValue};`);
            } else {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} DROP DEFAULT;`);
            }
          } else if (dialect === 'mysql') {
            if (col.defaultValue) {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} SET DEFAULT ${col.defaultValue};`);
            } else {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(col.name, dialect)} DROP DEFAULT;`);
            }
          } else if (dialect === 'mssql') {
            if (col.defaultValue) {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD CONSTRAINT ${quoteId('DF_' + td.name + '_' + col.name, dialect)} DEFAULT ${col.defaultValue} FOR ${quoteId(col.name, dialect)};`);
            } else {
              lines.push(`-- MSSQL: drop existing default constraint for ${col.name} before adding a new one`);
            }
          } else if (dialect === 'oracle') {
            if (col.defaultValue) {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY (${quoteId(col.name, dialect)} DEFAULT ${col.defaultValue});`);
            } else {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY (${quoteId(col.name, dialect)} DEFAULT NULL);`);
            }
          } else {
            lines.push(`-- SQLite: default changes require table recreation`);
          }
        } else {
          if (dialect === 'mysql') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY COLUMN ${columnDefSQL(col, dialect)};`);
          } else if (dialect === 'postgres') {
            lines.push(`-- Review change: ${change.field} on ${col.name}`);
          } else if (dialect === 'mssql') {
            lines.push(`-- Review change: ${change.field} on ${col.name}`);
          } else if (dialect === 'oracle') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY (${columnDefSQL(col, dialect)});`);
          } else {
            lines.push(`-- SQLite: column changes require table recreation`);
          }
        }
      }
    }
    if (td.columnsModified.length) lines.push('');

    for (const con of td.constraintsRemoved) {
      if (con.type === 'PRIMARY KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_pkey'), dialect)};`);
      } else if (con.type === 'UNIQUE') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_key'), dialect)};`);
      } else if (con.type === 'FOREIGN KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_fkey'), dialect)};`);
      } else if (con.type === 'CHECK') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_check'), dialect)};`);
      }
    }
    if (td.constraintsRemoved.length) lines.push('');

    for (const con of td.constraintsAdded) {
      if (con.type === 'PRIMARY KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD PRIMARY KEY (${con.columns.map(c => quoteId(c, dialect)).join(', ')});`);
      } else if (con.type === 'UNIQUE') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_key'), dialect)} UNIQUE (${con.columns.map(c => quoteId(c, dialect)).join(', ')});`);
      } else if (con.type === 'FOREIGN KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_fkey'), dialect)} FOREIGN KEY (${con.columns.map(c => quoteId(c, dialect)).join(', ')}) REFERENCES ${quoteId(con.refTable, dialect)}(${con.refColumns.map(c => quoteId(c, dialect)).join(', ')});`);
      } else if (con.type === 'CHECK') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD CONSTRAINT ${quoteId(con.name || (td.name + '_check'), dialect)} CHECK (${con.expression});`);
      }
    }
    if (td.constraintsAdded.length) lines.push('');

    if (td.constraintsChanged && !td.constraintsAdded.length && !td.constraintsRemoved.length) {
      lines.push(`-- Table-level constraints changed in ${td.name}`);
      lines.push(`-- Please review and update constraints manually.`);
      lines.push('');
    }
  }

  if (diff.enumsAdded && diff.enumsAdded.length) {
    for (const en of diff.enumsAdded) {
      if (dialect === 'postgres') {
        lines.push(`CREATE TYPE ${quoteId(en.name, dialect)} AS ENUM (${en.values.map(v => `'${v}'`).join(', ')});`);
      } else {
        lines.push(`-- CREATE TYPE for enum ${en.name} (PostgreSQL-specific);`);
      }
    }
    if (diff.enumsAdded.length) lines.push('');
  }

  if (diff.enumsRemoved && diff.enumsRemoved.length) {
    for (const en of diff.enumsRemoved) {
      if (dialect === 'postgres') {
        lines.push(`DROP TYPE ${quoteId(en.name, dialect)};`);
      } else {
        lines.push(`-- DROP TYPE for enum ${en.name} (PostgreSQL-specific);`);
      }
    }
    if (diff.enumsRemoved.length) lines.push('');
  }

  if (diff.triggersRemoved && diff.triggersRemoved.length) {
    for (const tr of diff.triggersRemoved) {
      lines.push(`DROP TRIGGER IF EXISTS ${quoteId(tr.name, dialect)} ON ${quoteId(tr.table, dialect)};`);
    }
    if (diff.triggersRemoved.length) lines.push('');
  }

  if (diff.triggersModified && diff.triggersModified.length) {
    for (const tm of diff.triggersModified) {
      lines.push(`DROP TRIGGER IF EXISTS ${quoteId(tm.oldTrigger.name, dialect)} ON ${quoteId(tm.oldTrigger.table, dialect)};`);
      lines.push(tm.newTrigger.raw + ';');
    }
    if (diff.triggersModified.length) lines.push('');
  }

  if (diff.triggersAdded && diff.triggersAdded.length) {
    for (const tr of diff.triggersAdded) {
      lines.push(tr.raw + ';');
    }
    if (diff.triggersAdded.length) lines.push('');
  }

  if (diff.viewsRemoved && diff.viewsRemoved.length) {
    for (const vw of diff.viewsRemoved) {
      lines.push(`DROP VIEW IF EXISTS ${quoteId(vw.name, dialect)};`);
    }
    if (diff.viewsRemoved.length) lines.push('');
  }

  if (diff.viewsModified && diff.viewsModified.length) {
    for (const vm of diff.viewsModified) {
      lines.push(`DROP VIEW IF EXISTS ${quoteId(vm.oldView.name, dialect)};`);
      lines.push(`CREATE OR REPLACE VIEW ${quoteId(vm.newView.name, dialect)} AS ${vm.newView.query};`);
    }
    if (diff.viewsModified.length) lines.push('');
  }

  if (diff.viewsAdded && diff.viewsAdded.length) {
    for (const vw of diff.viewsAdded) {
      lines.push(`CREATE OR REPLACE VIEW ${quoteId(vw.name, dialect)} AS ${vw.query};`);
    }
    if (diff.viewsAdded.length) lines.push('');
  }

  // Function migrations
  if (diff.functionsRemoved && diff.functionsRemoved.length) {
    for (const fn of diff.functionsRemoved) {
      const dropType = fn.isProcedure ? 'PROCEDURE' : 'FUNCTION';
      lines.push(`DROP ${dropType} IF EXISTS ${quoteId(fn.name, dialect)}${fn.args ? '(' + fn.args + ')' : ''};`);
    }
    if (diff.functionsRemoved.length) lines.push('');
  }

  if (diff.functionsModified && diff.functionsModified.length) {
    for (const fm of diff.functionsModified) {
      const dropType = fm.oldFunction.isProcedure ? 'PROCEDURE' : 'FUNCTION';
      lines.push(`DROP ${dropType} IF EXISTS ${quoteId(fm.oldFunction.name, dialect)}${fm.oldFunction.args ? '(' + fm.oldFunction.args + ')' : ''};`);
      lines.push(fm.newFunction.raw + ';');
    }
    if (diff.functionsModified.length) lines.push('');
  }

  if (diff.functionsAdded && diff.functionsAdded.length) {
    for (const fn of diff.functionsAdded) {
      lines.push(fn.raw + ';');
    }
    if (diff.functionsAdded.length) lines.push('');
  }

  return lines.join('\n');
}

function generateRollbackMigration(diff, dialect) {
  const lines = [];

  // Functions added → drop
  if (diff.functionsAdded && diff.functionsAdded.length) {
    for (const fn of diff.functionsAdded) {
      const dropType = fn.isProcedure ? 'PROCEDURE' : 'FUNCTION';
      lines.push(`DROP ${dropType} IF EXISTS ${quoteId(fn.name, dialect)}${fn.args ? '(' + fn.args + ')' : ''};`);
    }
    if (diff.functionsAdded.length) lines.push('');
  }

  // Views added → drop
  if (diff.viewsAdded && diff.viewsAdded.length) {
    for (const vw of diff.viewsAdded) {
      lines.push(`DROP VIEW IF EXISTS ${quoteId(vw.name, dialect)};`);
    }
    if (diff.viewsAdded.length) lines.push('');
  }

  // Triggers added → drop
  if (diff.triggersAdded && diff.triggersAdded.length) {
    for (const tr of diff.triggersAdded) {
      lines.push(`DROP TRIGGER IF EXISTS ${quoteId(tr.name, dialect)} ON ${quoteId(tr.table, dialect)};`);
    }
    if (diff.triggersAdded.length) lines.push('');
  }

  // Enums added → drop
  if (diff.enumsAdded && diff.enumsAdded.length) {
    for (const en of diff.enumsAdded) {
      if (dialect === 'postgres') {
        lines.push(`DROP TYPE ${quoteId(en.name, dialect)};`);
      } else {
        lines.push(`-- DROP TYPE for enum ${en.name} (PostgreSQL-specific);`);
      }
    }
    if (diff.enumsAdded.length) lines.push('');
  }

  // Tables added → drop
  for (const table of diff.tablesAdded) {
    lines.push(`DROP TABLE ${quoteId(table.name, dialect)};`);
    lines.push('');
  }

  // Tables renamed → rename back
  for (const ren of diff.tablesRenamed || []) {
    if (dialect === 'postgres' || dialect === 'sqlite') {
      lines.push(`ALTER TABLE ${quoteId(ren.newTable.name, dialect)} RENAME TO ${quoteId(ren.oldTable.name, dialect)};`);
    } else if (dialect === 'mysql') {
      lines.push(`RENAME TABLE ${quoteId(ren.newTable.name, dialect)} TO ${quoteId(ren.oldTable.name, dialect)};`);
    } else if (dialect === 'mssql') {
      lines.push(`EXEC sp_rename '${quoteId(ren.newTable.name, dialect).replace(/[[\]]/g, '')}', '${ren.oldTable.name}';`);
    } else if (dialect === 'oracle') {
      lines.push(`RENAME ${quoteId(ren.newTable.name, dialect)} TO ${quoteId(ren.oldTable.name, dialect)};`);
    }
  }
  if (diff.tablesRenamed && diff.tablesRenamed.length) lines.push('');

  // Modified tables — reverse changes
  for (const td of diff.tablesModified) {
    lines.push(`-- Rollback changes in table: ${td.name}`);

    // Drop constraints that were added
    for (const con of td.constraintsAdded) {
      if (con.type === 'PRIMARY KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_pkey'), dialect)};`);
      } else if (con.type === 'UNIQUE') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_key'), dialect)};`);
      } else if (con.type === 'FOREIGN KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_fkey'), dialect)};`);
      } else if (con.type === 'CHECK') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP CONSTRAINT ${quoteId(con.name || (td.name + '_check'), dialect)};`);
      }
    }
    if (td.constraintsAdded.length) lines.push('');

    // Re-add constraints that were removed
    for (const con of td.constraintsRemoved) {
      if (con.type === 'PRIMARY KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD PRIMARY KEY (${con.columns.map(c => quoteId(c, dialect)).join(', ')});`);
      } else if (con.type === 'UNIQUE') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_key'), dialect)} UNIQUE (${con.columns.map(c => quoteId(c, dialect)).join(', ')});`);
      } else if (con.type === 'FOREIGN KEY') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD CONSTRAINT ${quoteId(con.name || (td.name + '_' + con.columns.join('_') + '_fkey'), dialect)} FOREIGN KEY (${con.columns.map(c => quoteId(c, dialect)).join(', ')}) REFERENCES ${quoteId(con.refTable, dialect)}(${con.refColumns.map(c => quoteId(c, dialect)).join(', ')});`);
      } else if (con.type === 'CHECK') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD CONSTRAINT ${quoteId(con.name || (td.name + '_check'), dialect)} CHECK (${con.expression});`);
      }
    }
    if (td.constraintsRemoved.length) lines.push('');

    // Revert column modifications
    for (const mod of td.columnsModified) {
      const oldCol = td.oldTable && td.oldTable.columns.find(c => c.name === mod.column.name);
      if (!oldCol) continue;

      if (dialect === 'mysql') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY COLUMN ${columnDefSQL(oldCol, dialect)};`);
      } else if (dialect === 'mssql') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(oldCol.name, dialect)} ${oldCol.type}${oldCol.nullable ? '' : ' NOT NULL'};`);
      } else if (dialect === 'oracle') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} MODIFY (${columnDefSQL(oldCol, dialect)});`);
      } else if (dialect === 'postgres') {
        for (const change of mod.changes) {
          if (change.field === 'type') {
            lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(mod.column.name, dialect)} TYPE ${change.old};`);
          } else if (change.field === 'nullable') {
            if (change.old === 'NOT NULL') {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(mod.column.name, dialect)} SET NOT NULL;`);
            } else {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(mod.column.name, dialect)} DROP NOT NULL;`);
            }
          } else if (change.field === 'default') {
            if (change.old !== 'none') {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(mod.column.name, dialect)} SET DEFAULT ${change.old};`);
            } else {
              lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ALTER COLUMN ${quoteId(mod.column.name, dialect)} DROP DEFAULT;`);
            }
          } else {
            lines.push(`-- Review rollback: revert ${change.field} on ${mod.column.name} to ${change.old}`);
          }
        }
      } else {
        lines.push(`-- SQLite: column changes require table recreation`);
      }
    }
    if (td.columnsModified.length) lines.push('');

    // Drop columns that were added
    for (const col of td.columnsAdded) {
      if (dialect === 'sqlite') {
        lines.push(`-- SQLite does not support DROP COLUMN directly.`);
        lines.push(`-- ALTER TABLE ${quoteId(td.name, dialect)} DROP COLUMN ${quoteId(col.name, dialect)}; -- NOT SUPPORTED`);
      } else {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} DROP COLUMN ${quoteId(col.name, dialect)};`);
      }
    }
    if (td.columnsAdded.length) lines.push('');

    // Re-add columns that were removed
    for (const col of td.columnsRemoved) {
      if (dialect === 'sqlite') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD COLUMN ${columnDefSQL(col, dialect)};`);
      } else {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} ADD ${columnDefSQL(col, dialect)};`);
      }
    }
    if (td.columnsRemoved.length) lines.push('');

    // Rename columns back
    for (const ren of td.columnsRenamed) {
      if (dialect === 'postgres' || dialect === 'sqlite') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} RENAME COLUMN ${quoteId(ren.newColumn.name, dialect)} TO ${quoteId(ren.oldColumn.name, dialect)};`);
      } else if (dialect === 'mysql') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} CHANGE COLUMN ${quoteId(ren.newColumn.name, dialect)} ${columnDefSQL(ren.oldColumn, dialect)};`);
      } else if (dialect === 'mssql') {
        lines.push(`EXEC sp_rename '${quoteId(td.name, dialect).replace(/[[\]]/g, '')}.${quoteId(ren.newColumn.name, dialect).replace(/[[\]]/g, '')}', '${ren.oldColumn.name}', 'COLUMN';`);
      } else if (dialect === 'oracle') {
        lines.push(`ALTER TABLE ${quoteId(td.name, dialect)} RENAME COLUMN ${quoteId(ren.newColumn.name, dialect)} TO ${quoteId(ren.oldColumn.name, dialect)};`);
      }
    }
    if (td.columnsRenamed.length) lines.push('');
  }

  // Tables removed → recreate
  for (const table of diff.tablesRemoved) {
    lines.push(`-- Recreate table: ${table.name}`);
    lines.push(`CREATE TABLE ${quoteId(table.name, dialect)} (`);
    const colLines = table.columns.map(c => '  ' + columnDefSQL(c, dialect));
    if (table.constraints.length) {
      for (const con of table.constraints) {
        colLines.push('  ' + con.raw);
      }
    }
    lines.push(colLines.join(',\n'));
    lines.push(`);`);
    lines.push('');
  }

  // Enums removed → recreate
  if (diff.enumsRemoved && diff.enumsRemoved.length) {
    for (const en of diff.enumsRemoved) {
      if (dialect === 'postgres') {
        lines.push(`CREATE TYPE ${quoteId(en.name, dialect)} AS ENUM (${en.values.map(v => `'${v}'`).join(', ')});`);
      } else {
        lines.push(`-- CREATE TYPE for enum ${en.name} (PostgreSQL-specific);`);
      }
    }
    if (diff.enumsRemoved.length) lines.push('');
  }

  // Triggers removed → recreate
  if (diff.triggersRemoved && diff.triggersRemoved.length) {
    for (const tr of diff.triggersRemoved) {
      lines.push(tr.raw + ';');
    }
    if (diff.triggersRemoved.length) lines.push('');
  }

  // Triggers modified → drop new, recreate old
  if (diff.triggersModified && diff.triggersModified.length) {
    for (const tm of diff.triggersModified) {
      lines.push(`DROP TRIGGER IF EXISTS ${quoteId(tm.newTrigger.name, dialect)} ON ${quoteId(tm.newTrigger.table, dialect)};`);
      lines.push(tm.oldTrigger.raw + ';');
    }
    if (diff.triggersModified.length) lines.push('');
  }

  // Views removed → recreate
  if (diff.viewsRemoved && diff.viewsRemoved.length) {
    for (const vw of diff.viewsRemoved) {
      lines.push(`CREATE OR REPLACE VIEW ${quoteId(vw.name, dialect)} AS ${vw.query};`);
    }
    if (diff.viewsRemoved.length) lines.push('');
  }

  // Views modified → drop new, recreate old
  if (diff.viewsModified && diff.viewsModified.length) {
    for (const vm of diff.viewsModified) {
      lines.push(`DROP VIEW IF EXISTS ${quoteId(vm.newView.name, dialect)};`);
      lines.push(`CREATE OR REPLACE VIEW ${quoteId(vm.oldView.name, dialect)} AS ${vm.oldView.query};`);
    }
    if (diff.viewsModified.length) lines.push('');
  }

  // Functions removed → recreate
  if (diff.functionsRemoved && diff.functionsRemoved.length) {
    for (const fn of diff.functionsRemoved) {
      lines.push(fn.raw + ';');
    }
    if (diff.functionsRemoved.length) lines.push('');
  }

  // Functions modified → drop new, recreate old
  if (diff.functionsModified && diff.functionsModified.length) {
    for (const fm of diff.functionsModified) {
      const dropType = fm.newFunction.isProcedure ? 'PROCEDURE' : 'FUNCTION';
      lines.push(`DROP ${dropType} IF EXISTS ${quoteId(fm.newFunction.name, dialect)}${fm.newFunction.args ? '(' + fm.newFunction.args + ')' : ''};`);
      lines.push(fm.oldFunction.raw + ';');
    }
    if (diff.functionsModified.length) lines.push('');
  }

  return lines.join('\n');
}

// -----------------------------
// Markdown Report
// -----------------------------
function generateMarkdown(diff, dialect) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const dialectName = dialect === 'postgres' ? 'PostgreSQL' : dialect === 'mysql' ? 'MySQL / MariaDB' : dialect === 'mssql' ? 'SQL Server' : 'SQLite';
  let md = `# Schema Diff Report\n\n`;
  md += `**Dialect:** ${dialectName}  \n`;
  md += `**Generated:** ${now}\n\n`;

  md += `## Summary\n\n`;
  md += `- Tables in old schema: ${diff.totalTablesOld}\n`;
  md += `- Tables in new schema: ${diff.totalTablesNew}\n`;
  md += `- Tables added: ${diff.tablesAdded.length}\n`;
  md += `- Tables removed: ${diff.tablesRemoved.length}\n`;
  md += `- Tables renamed: ${diff.tablesRenamed.length}\n`;
  md += `- Tables modified: ${diff.tablesModified.length}\n`;
  if (diff.enumsAdded.length || diff.enumsRemoved.length) {
    md += `- Enums added: ${diff.enumsAdded.length}\n`;
    md += `- Enums removed: ${diff.enumsRemoved.length}\n`;
  }
  if (diff.triggersAdded.length || diff.triggersRemoved.length || diff.triggersModified.length) {
    md += `- Triggers added: ${diff.triggersAdded.length}\n`;
    md += `- Triggers removed: ${diff.triggersRemoved.length}\n`;
    md += `- Triggers modified: ${diff.triggersModified.length}\n`;
  }
  if (diff.viewsAdded.length || diff.viewsRemoved.length || diff.viewsModified.length) {
    md += `- Views added: ${diff.viewsAdded.length}\n`;
    md += `- Views removed: ${diff.viewsRemoved.length}\n`;
    md += `- Views modified: ${diff.viewsModified.length}\n`;
  }
  if (diff.functionsAdded.length || diff.functionsRemoved.length || diff.functionsModified.length) {
    md += `- Functions added: ${diff.functionsAdded.length}\n`;
    md += `- Functions removed: ${diff.functionsRemoved.length}\n`;
    md += `- Functions modified: ${diff.functionsModified.length}\n`;
  }
  md += `\n`;

  if (diff.tablesAdded.length) {
    md += `## Tables Added\n\n`;
    for (const table of diff.tablesAdded) {
      md += `### ${table.name}\n\n`;
      md += `| Column | Type | Attributes |\n`;
      md += `|--------|------|------------|\n`;
      for (const col of table.columns) {
        const attrs = [];
        if (!col.nullable) attrs.push('NOT NULL');
        if (col.primaryKey) attrs.push('PK');
        if (col.unique) attrs.push('UNIQUE');
        if (col.defaultValue) attrs.push(`DEFAULT ${col.defaultValue}`);
        md += `| ${col.name} | ${col.type} | ${attrs.join(', ')} |\n`;
      }
      md += `\n`;
    }
  }

  if (diff.tablesRemoved.length) {
    md += `## Tables Removed\n\n`;
    for (const table of diff.tablesRemoved) {
      md += `### ${table.name}\n\n`;
      md += `| Column | Type | Attributes |\n`;
      md += `|--------|------|------------|\n`;
      for (const col of table.columns) {
        const attrs = [];
        if (!col.nullable) attrs.push('NOT NULL');
        if (col.primaryKey) attrs.push('PK');
        if (col.unique) attrs.push('UNIQUE');
        if (col.defaultValue) attrs.push(`DEFAULT ${col.defaultValue}`);
        md += `| ${col.name} | ${col.type} | ${attrs.join(', ')} |\n`;
      }
      md += `\n`;
    }
  }

  if (diff.tablesRenamed && diff.tablesRenamed.length) {
    md += `## Tables Renamed\n\n`;
    md += `| Old Name | New Name | Columns |\n`;
    md += `|----------|----------|---------|\n`;
    for (const ren of diff.tablesRenamed) {
      md += `| ${ren.oldTable.name} | ${ren.newTable.name} | ${ren.newTable.columns.length} |\n`;
    }
    md += `\n`;
  }

  if (diff.tablesModified.length) {
    md += `## Tables Modified\n\n`;
    for (const td of diff.tablesModified) {
      md += `### ${td.name}\n\n`;

      if (td.columnsAdded && td.columnsAdded.length) {
        md += `**Columns added:**\n\n`;
        md += `| Column | Type | Attributes |\n`;
        md += `|--------|------|------------|\n`;
        for (const col of td.columnsAdded) {
          const attrs = [];
          if (!col.nullable) attrs.push('NOT NULL');
          if (col.primaryKey) attrs.push('PK');
          if (col.unique) attrs.push('UNIQUE');
          if (col.defaultValue) attrs.push(`DEFAULT ${col.defaultValue}`);
          md += `| ${col.name} | ${col.type} | ${attrs.join(', ')} |\n`;
        }
        md += `\n`;
      }

      if (td.columnsRemoved && td.columnsRemoved.length) {
        md += `**Columns removed:**\n\n`;
        md += `| Column | Type |\n`;
        md += `|--------|------|\n`;
        for (const col of td.columnsRemoved) {
          md += `| ${col.name} | ${col.type} |\n`;
        }
        md += `\n`;
      }

      if (td.columnsRenamed && td.columnsRenamed.length) {
        md += `**Columns renamed:**\n\n`;
        md += `| Old Name | New Name | Type |\n`;
        md += `|----------|----------|------|\n`;
        for (const ren of td.columnsRenamed) {
          md += `| ${ren.oldColumn.name} | ${ren.newColumn.name} | ${ren.newColumn.type} |\n`;
        }
        md += `\n`;
      }

      if (td.columnsModified && td.columnsModified.length) {
        md += `**Columns modified:**\n\n`;
        md += `| Column | Changes |\n`;
        md += `|--------|---------|\n`;
        for (const mod of td.columnsModified) {
          const changeStr = mod.changes.map(c => `${c.field}: ${c.old} → ${c.new}`).join('; ');
          md += `| ${mod.column.name} | ${changeStr} |\n`;
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
  md += `*Generated by SchemaLens — https://schemalens.tech*`;
  return md;
}

function generateMigrationWarnings(diff, dialect) {
  const warnings = [];
  function add(sev, title, suggestion) {
    warnings.push({ severity: sev, title, suggestion });
  }

  // Table drops = data loss
  for (const t of diff.tablesRemoved || []) {
    add('critical', `DROP TABLE \`${t.name}\` will permanently delete all data in this table.`, 'Back up the table before running this migration. Consider renaming instead of dropping if data may be needed later.');
  }

  // Column drops = data loss
  for (const td of diff.tablesModified || []) {
    for (const col of td.columnsRemoved || []) {
      add('critical', `DROP COLUMN \`${col.name}\` from \`${td.name}\` will permanently delete all data in that column.`, 'Back up the column data before migrating. If the column is referenced by views, triggers, or application code, update those first.');
    }
  }

  // NOT NULL on existing columns without default
  for (const td of diff.tablesModified || []) {
    for (const mod of td.columnsModified || []) {
      for (const change of mod.changes || []) {
        if (change.field === 'nullable' && !mod.column.nullable) {
          if (!mod.column.defaultValue) {
            add('critical', `SET NOT NULL on \`${mod.column.name}\` (\`${td.name}\`) without a DEFAULT will fail if the table has existing rows with NULL values.`, `Add a DEFAULT value first, backfill existing NULLs, then add the NOT NULL constraint.`);
          }
        }
        if (change.field === 'type') {
          const oldType = (change.old || '').toLowerCase();
          const newType = (change.new || '').toLowerCase();
          if (oldType.includes('varchar') && newType.includes('varchar')) {
            const oldLen = parseInt(oldType.match(/\d+/)?.[0] || '0', 10);
            const newLen = parseInt(newType.match(/\d+/)?.[0] || '0', 10);
            if (newLen > 0 && newLen < oldLen) {
              add('critical', `VARCHAR shrink (${oldLen} → ${newLen}) on \`${mod.column.name}\` may truncate existing data.`, 'Backfill and verify no values exceed the new length before migrating.');
            }
          }
          if ((oldType.includes('int') || oldType.includes('serial')) && (newType.includes('smallint') || newType.includes('tinyint'))) {
            add('critical', `Downsizing integer type on \`${mod.column.name}\` may overflow existing values.`, 'Verify all existing values fit in the smaller type range before migrating.');
          }
          if (oldType.includes('text') && newType.includes('varchar')) {
            add('critical', `TEXT → VARCHAR on \`${mod.column.name}\` may truncate existing long values.`, 'Check max length of existing values before narrowing the type.');
          }
          if (oldType.includes('decimal') && newType.includes('decimal')) {
            const oldPrec = oldType.match(/(\d+),\s*(\d+)/);
            const newPrec = newType.match(/(\d+),\s*(\d+)/);
            if (oldPrec && newPrec) {
              if (parseInt(newPrec[1], 10) < parseInt(oldPrec[1], 10) || parseInt(newPrec[2], 10) < parseInt(oldPrec[2], 10)) {
                add('critical', `DECIMAL precision reduction on \`${mod.column.name}\` may truncate or round existing values.`, 'Verify financial/data accuracy after the migration.');
              }
            }
          }
          if ((oldType.includes('timestamp') && newType.includes('date')) || (oldType.includes('date') && newType.includes('timestamp'))) {
            add('warning', `Changing ${mod.column.type} on \`${mod.column.name}\` may cause implicit casting or timezone issues.`, 'Review how your application reads this column after the type change.');
          }
        }
      }
    }
    for (const col of td.columnsAdded || []) {
      if (col.defaultValue && dialect === 'mysql') {
        add('warning', `Adding \`${col.name}\` with a DEFAULT in MySQL locks the entire table while populating existing rows.`, 'For large tables, consider adding the column without DEFAULT, backfilling with a script, then adding the DEFAULT constraint.');
      }
      if (col.defaultValue && dialect === 'postgres') {
        add('tip', `PostgreSQL 11+ optimizes ADD COLUMN with DEFAULT without rewriting the table.`, 'Ensure you are on PostgreSQL 11+ for instant DDL.');
      }
    }
  }

  // Index drops = query perf impact
  for (const td of diff.tablesModified || []) {
    for (const idx of td.indexesRemoved || []) {
      add('warning', `Dropping index \`${idx.name}\` on \`${td.name}\` may slow down queries that filter or sort by ${(idx.columns || []).join(', ')}.`, 'Verify the index is unused before dropping.');
    }
  }

  // Constraint drops
  for (const td of diff.tablesModified || []) {
    for (const con of td.constraintsRemoved || []) {
      if (con.type === 'FOREIGN KEY') {
        add('warning', `Dropping foreign key \`${con.name}\` on \`${td.name}\` removes referential integrity checks.`, 'Orphaned rows will no longer be prevented. If intentional, consider adding application-level validation.');
      }
      if (con.type === 'PRIMARY KEY') {
        add('critical', `Dropping PRIMARY KEY on \`${td.name}\` can break ORM models, replication, and downstream ETL pipelines.`, 'Ensure every dependent system references an alternative unique key before proceeding.');
      }
      if (con.type === 'UNIQUE') {
        add('warning', `Dropping UNIQUE constraint \`${con.name}\` on \`${td.name}\` allows duplicate values.`, 'Applications assuming uniqueness may throw errors or corrupt data.');
      }
    }
  }

  // SQLite specific limitations
  if (dialect === 'sqlite') {
    const hasModifications = (diff.tablesModified || []).some(td =>
      (td.columnsRemoved || []).length > 0 ||
      (td.columnsModified || []).length > 0
    );
    if (hasModifications) {
      add('warning', `SQLite has limited ALTER TABLE support.`, 'Dropping columns and changing types require recreating the entire table. SchemaLens generates comments — you must implement the table recreation manually or use a tool like sqlite-utils.');
    }
  }

  // View dependencies breaking
  if (diff.breakingViews && diff.breakingViews.length > 0) {
    for (const bv of diff.breakingViews) {
      add('critical', `View \`${bv.view}\` references dropped or modified column \`${bv.column}\` in \`${bv.table}\`.`, 'Drop and recreate the view after the migration, or update the view query to exclude the removed column.');
    }
  }

  // PostgreSQL index creation tip
  if (dialect === 'postgres') {
    for (const td of diff.tablesModified || []) {
      if ((td.indexesAdded || []).length > 0) {
        add('tip', `Adding indexes in PostgreSQL locks writes on the table.`, 'For production, prefer CREATE INDEX CONCURRENTLY to avoid blocking writes.');
      }
    }
  }

  // MySQL ALGORITHM=INPLACE tip for large tables
  if (dialect === 'mysql') {
    const hasColumnChanges = (diff.tablesModified || []).some(td =>
      (td.columnsAdded || []).length > 0 ||
      (td.columnsModified || []).length > 0
    );
    if (hasColumnChanges) {
      add('tip', `MySQL 8.0 supports INSTANT ALGORITHM for some column changes.`, 'Add ALGORITHM=INSTANT, LOCK=NONE to your ALTER TABLE when supported to avoid table locks.');
    }
  }

  // Enum drops
  if (diff.enumsRemoved && diff.enumsRemoved.length > 0) {
    for (const en of diff.enumsRemoved) {
      add('warning', `Dropping ENUM type \`${en.name}\` will fail if any column still references it.`, 'Ensure all columns using this enum are altered to a different type first.');
    }
  }

  return warnings;
}

module.exports = {
  stripComments,
  splitStatements,
  tokenize,
  splitBody,
  parseColumn,
  parseConstraint,
  parseCreateTable,
  parseCreateIndex,
  parseCreateEnum,
  parseCreateView,
  parseCreateTrigger,
  parseCreateFunction,
  parseSQL,
  diffSchemas,
  diffTable,
  detectBreakingChanges,
  calculateRiskScore,
  generateMigration,
  generateRollbackMigration,
  generateMigrationWarnings,
  generateMarkdown,
  quoteId,
  columnDefSQL,
  levenshteinDistance,
  isRenameCandidate,
  normalizeName
};
