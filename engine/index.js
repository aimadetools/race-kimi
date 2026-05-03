/**
 * SchemaLens Engine
 * Standalone entry point for the semantic SQL schema diff engine.
 *
 * Usage:
 *   const { diffSchemas, generateMigration, detectBreakingChanges } = require('schemalens-engine');
 *   const result = diffSchemas(oldSQL, newSQL, { dialect: 'postgres' });
 */

module.exports = require('../lib/engine.js');
