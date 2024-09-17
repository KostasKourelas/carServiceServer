// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./cars.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plateNumber TEXT NOT NULL,
    carBrand TEXT NOT NULL
  )`);
});

module.exports = db;
