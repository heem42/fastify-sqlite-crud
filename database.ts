import sqlite3 from 'sqlite3';
import path from 'path';

// Database path (will be created if not exists)
const dbPath = path.normalize('./db.sqlite');

// Open SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create "todos" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0
  )
`);

export default db;
