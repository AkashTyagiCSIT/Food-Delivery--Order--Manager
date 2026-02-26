const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const isVercel = !!process.env.VERCEL;
const defaultPath = isVercel ? "/tmp/orders.db" : "./data/orders.db";
const dbPath = path.resolve(process.env.DB_PATH || defaultPath);

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    orderId INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurantName TEXT NOT NULL,
    itemCount INTEGER NOT NULL,
    isPaid INTEGER NOT NULL DEFAULT 0,
    deliveryDistance REAL NOT NULL
  )
`);

module.exports = db;
