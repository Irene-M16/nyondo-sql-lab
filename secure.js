const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// SAFE SEARCH (no SQL injection)
function searchProductSafe(name) {
  if (!name || name.length < 2) {
    console.log("Invalid input");
    return [];
  }

  const stmt = db.prepare(
    "SELECT * FROM products WHERE name LIKE ?"
  );

  return stmt.all(`%${name}%`);
}

// SAFE LOGIN
function loginSafe(username, password) {
  if (!username || !password) {
    console.log("Invalid input");
    return undefined;
  }

  const stmt = db.prepare(
    "SELECT * FROM users WHERE username = ? AND password = ?"
  );

  return stmt.get(username, password);
}


console.log('Test 1:', searchProductSafe("' OR 1=1--"));
console.log('Test 2:', searchProductSafe("' UNION SELECT id,username,password,role FROM users--"));
console.log('Test 3:', loginSafe("admin'--", 'anything'));
console.log('Test 4:', loginSafe("' OR '1'='1", "' OR '1'='1"));

