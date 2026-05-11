const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// Query A
console.log('Query A');
console.log(db.prepare('SELECT * FROM products').all());

// Query B
console.log('Query B');
console.log(db.prepare('SELECT name, price FROM products').all());

// Query C
console.log('Query C');
console.log(db.prepare('SELECT * FROM products WHERE id = 3').get());

// Query D
console.log('Query D');
console.log(db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all());

// Query E
console.log('Query E');
console.log(db.prepare('SELECT * FROM products ORDER BY price DESC').all());

// Query F
console.log('Query F');
console.log(db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all());

// Query G
console.log('Query G');
db.prepare('UPDATE products SET price = 38000 WHERE id = 1').run();
console.log(db.prepare('SELECT * FROM products').all());