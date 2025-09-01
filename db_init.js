const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const dbFile = './studimi.db';

if(fs.existsSync(dbFile)) fs.unlinkSync(dbFile);
const db = new sqlite3.Database(dbFile);

db.serialize(()=>{
  db.run(`CREATE TABLE todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    due_date TEXT,
    completed INTEGER
  )`);
  db.run("INSERT INTO todos (text,due_date,completed) VALUES ('예시 할 일', '2025-09-10', 0)");
});

db.close();
console.log('DB initialized');
