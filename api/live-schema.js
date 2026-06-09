// Live Database Schema Fetch — connect to PostgreSQL or MySQL and return CREATE TABLE SQL
// WARNING: Connection strings are processed in-memory only. Never logged or stored.
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { connectionString, dialect } = req.body || {};

  if (!connectionString || typeof connectionString !== 'string') {
    return res.status(400).json({ error: 'Missing connectionString.' });
  }

  if (!dialect || !['postgres', 'mysql'].includes(dialect)) {
    return res.status(400).json({ error: 'Unsupported dialect. Use postgres or mysql.' });
  }

  // Basic safety: reject connection strings that look like file URLs or contain shell metacharacters
  if (/[;&|`$]/.test(connectionString)) {
    return res.status(400).json({ error: 'Connection string contains unsafe characters.' });
  }

  try {
    let schemaSQL = '';
    if (dialect === 'postgres') {
      schemaSQL = await fetchPostgresSchema(connectionString);
    } else {
      schemaSQL = await fetchMySQLSchema(connectionString);
    }

    return res.status(200).json({ schema: schemaSQL, dialect });
  } catch (err) {
    // Never leak the connection string in error messages
    const safeMessage = (err.message || 'Unknown error')
      .replace(connectionString, '[REDACTED]')
      .replace(/password=[^\s&]+/gi, 'password=***')
      .replace(/:[^:@]+@/g, ':***@');
    return res.status(500).json({ error: safeMessage });
  }
}

async function fetchPostgresSchema(connectionString) {
  const { Client } = await import('pg');
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 8000,
    query_timeout: 8000,
    ssl: { rejectUnauthorized: false }, // Allow self-signed certs; connection string may override
  });

  await client.connect();

  try {
    // Get current search_path to know which schemas to dump (default to public)
    const schemaRes = await client.query(`
      SELECT current_schema() as schema
    `);
    const targetSchema = schemaRes.rows[0]?.schema || 'public';

    // Tables
    const tablesRes = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = $1
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `, [targetSchema]);

    const tables = tablesRes.rows.map(r => r.table_name);
    const parts = [];

    for (const tableName of tables) {
      const lines = [];

      // Columns
      const colsRes = await client.query(`
        SELECT
          column_name,
          data_type,
          udt_name,
          character_maximum_length,
          numeric_precision,
          numeric_scale,
          is_nullable,
          column_default,
          ordinal_position
        FROM information_schema.columns
        WHERE table_schema = $1 AND table_name = $2
        ORDER BY ordinal_position
      `, [targetSchema, tableName]);

      for (const col of colsRes.rows) {
        let type = col.data_type;
        // Handle arrays, user-defined types, and common aliases
        if (col.data_type === 'USER-DEFINED') {
          type = col.udt_name;
        } else if (col.data_type === 'character varying' && col.character_maximum_length) {
          type = `varchar(${col.character_maximum_length})`;
        } else if (col.data_type === 'character' && col.character_maximum_length) {
          type = `char(${col.character_maximum_length})`;
        } else if (col.data_type === 'numeric' && col.numeric_precision !== null) {
          type = `numeric(${col.numeric_precision}${col.numeric_scale !== null ? ',' + col.numeric_scale : ''})`;
        } else if (col.udt_name && col.udt_name.startsWith('_')) {
          type = col.udt_name.substring(1) + '[]';
        }

        let def = `${quotePg(col.column_name)} ${type}`;
        if (col.is_nullable === 'NO') def += ' NOT NULL';
        if (col.column_default !== null) {
          // Skip PostgreSQL serial defaults (they are implicit)
          if (!col.column_default.includes('nextval(')) {
            def += ` DEFAULT ${col.column_default}`;
          }
        }
        lines.push(def);
      }

      // Primary key
      const pkRes = await client.query(`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_schema = $1
          AND tc.table_name = $2
        ORDER BY kcu.ordinal_position
      `, [targetSchema, tableName]);

      if (pkRes.rows.length > 0) {
        const pkCols = pkRes.rows.map(r => quotePg(r.column_name)).join(', ');
        lines.push(`PRIMARY KEY (${pkCols})`);
      }

      // Unique constraints
      const uniqueRes = await client.query(`
        SELECT tc.constraint_name, kcu.column_name, kcu.ordinal_position
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'UNIQUE'
          AND tc.table_schema = $1
          AND tc.table_name = $2
        ORDER BY tc.constraint_name, kcu.ordinal_position
      `, [targetSchema, tableName]);

      const uniqueGroups = {};
      for (const row of uniqueRes.rows) {
        if (!uniqueGroups[row.constraint_name]) uniqueGroups[row.constraint_name] = [];
        uniqueGroups[row.constraint_name].push(quotePg(row.column_name));
      }
      for (const cols of Object.values(uniqueGroups)) {
        lines.push(`UNIQUE (${cols.join(', ')})`);
      }

      // Foreign keys
      const fkRes = await client.query(`
        SELECT
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_schema = $1
          AND tc.table_name = $2
        ORDER BY kcu.ordinal_position
      `, [targetSchema, tableName]);

      for (const row of fkRes.rows) {
        lines.push(`FOREIGN KEY (${quotePg(row.column_name)}) REFERENCES ${quotePg(row.foreign_table_name)}(${quotePg(row.foreign_column_name)})`);
      }

      // CHECK constraints
      const checkRes = await client.query(`
        SELECT cc.check_clause
        FROM information_schema.check_constraints cc
        JOIN information_schema.table_constraints tc
          ON cc.constraint_name = tc.constraint_name
          AND cc.constraint_schema = tc.table_schema
        WHERE tc.constraint_type = 'CHECK'
          AND tc.table_schema = $1
          AND tc.table_name = $2
      `, [targetSchema, tableName]);

      for (const row of checkRes.rows) {
        lines.push(`CHECK (${row.check_clause})`);
      }

      parts.push(`CREATE TABLE ${quotePg(tableName)} (\n  ${lines.join(',\n  ')}\n);`);

      // Indexes (excluding those already captured as constraints)
      const idxRes = await client.query(`
        SELECT indexname, indexdef
        FROM pg_indexes
        WHERE schemaname = $1 AND tablename = $2
      `, [targetSchema, tableName]);

      for (const row of idxRes.rows) {
        // Skip primary key and unique indexes already captured
        const isPk = pkRes.rows.length > 0 && row.indexname.toLowerCase().endsWith('_pkey');
        const isUnique = row.indexdef.toUpperCase().includes(' UNIQUE ');
        if (isPk) continue;
        // Keep unique indexes as they may be partial or functional
        parts.push(row.indexdef.replace(new RegExp(`^CREATE ${isUnique ? 'UNIQUE ' : ''}INDEX `, 'i'), `CREATE ${isUnique ? 'UNIQUE ' : ''}INDEX ${quotePg(row.indexname)} ON ${quotePg(tableName)} `) + ';');
      }
    }

    return parts.join('\n\n');
  } finally {
    await client.end().catch(() => {});
  }
}

async function fetchMySQLSchema(connectionString) {
  const mysql = await import('mysql2/promise');
  const conn = await mysql.createConnection({
    uri: connectionString,
    connectTimeout: 8000,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Get current database
    const [dbRows] = await conn.execute('SELECT DATABASE() as db');
    const dbName = dbRows[0]?.db;
    if (!dbName) {
      throw new Error('Could not determine database name from connection string.');
    }

    const [tableRows] = await conn.execute(
      'SELECT table_name FROM information_schema.tables WHERE table_schema = ? AND table_type = "BASE TABLE" ORDER BY table_name',
      [dbName]
    );

    const parts = [];
    for (const row of tableRows) {
      const tableName = row.table_name;
      const [createRows] = await conn.execute(`SHOW CREATE TABLE \`${dbName}\`.\`${tableName}\``);
      if (createRows.length > 0) {
        let ddl = createRows[0]['Create Table'];
        // Remove ENGINE, AUTO_INCREMENT, CHARSET, COLLATE lines to reduce environment-specific noise
        ddl = ddl
          .replace(/\s*ENGINE=\w+/gi, '')
          .replace(/\s*AUTO_INCREMENT=\d+/gi, '')
          .replace(/\s*DEFAULT CHARSET=\w+/gi, '')
          .replace(/\s*COLLATE=[\w_]+/gi, '')
          .replace(/\s*CHARSET=\w+/gi, '')
          .replace(/\s*COMMENT='[^']*'/gi, '')
          .trim();
        parts.push(ddl + ';');
      }
    }

    return parts.join('\n\n');
  } finally {
    await conn.end().catch(() => {});
  }
}

const PG_RESERVED = new Set([
  'all','analyse','analyze','and','any','array','as','asc','asymmetric','authorization','binary','both','case','cast','check','collate','collation','column','concurrently','constraint','create','cross','current_catalog','current_date','current_role','current_time','current_timestamp','current_user','default','deferrable','desc','distinct','do','else','end','except','false','fetch','for','foreign','freeze','from','full','grant','group','having','ilike','in','initially','inner','intersect','into','is','isnull','join','lateral','leading','left','like','limit','localtime','localtimestamp','natural','not','notnull','null','offset','on','only','or','order','outer','overlaps','placing','primary','references','returning','right','select','session_user','similar','some','symmetric','table','tablesample','then','to','trailing','true','union','unique','user','using','variadic','verbose','when','where','window','with',
  'user','order','group','table','column','select','insert','update','delete','where','from','join','limit','offset','null','true','false','default','primary','key','foreign','references','unique','check','constraint','index','view','trigger','function','procedure','database','schema','grant','revoke','and','or','not','as','on','in','is','like','between','exists','case','when','then','else','end','if','while','for','loop','return','begin','commit','rollback','transaction','set','drop','create','alter','rename','truncate','analyze','vacuum','explain','copy','listen','notify'
]);

function quotePg(name) {
  if (/^[a-z_][a-z0-9_$]*$/.test(name) && !PG_RESERVED.has(name.toLowerCase())) {
    return name;
  }
  return `"${name.replace(/"/g, '""')}"`;
}
