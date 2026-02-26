const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbDir = path.dirname(path.resolve(process.env.DB_PATH || "./data/orders.db"));
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.resolve(process.env.DB_PATH || "./data/orders.db"));

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
