import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'signpost.db');

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeSchema();
  }
  return db;
}

function initializeSchema() {
  if (!db) return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS spots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      neighborhood TEXT NOT NULL,
      cuisine TEXT NOT NULL,
      happy_hour_days TEXT NOT NULL,
      happy_hour_time TEXT NOT NULL,
      description TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      phone TEXT,
      website TEXT,
      price_range TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_spots_neighborhood ON spots(neighborhood);
    CREATE INDEX IF NOT EXISTS idx_spots_cuisine ON spots(cuisine);
  `);
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
