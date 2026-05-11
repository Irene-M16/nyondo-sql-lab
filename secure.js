const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// PRODUCT SEARCH (SAFE + VALIDATION
function searchProductSafe(name) {
  if (typeof name !== "string") {
    console.log("Invalid input");
    return [];
  }

  if (name.length < 2 || /[<>;]/.test(name)) {
    console.log("Invalid product name");
    return [];
  }

  const stmt = db.prepare("SELECT * FROM products WHERE name LIKE ?");
  return stmt.all(`%${name}%`);
}


// LOGIN (SAFE + VALIDATION)
function loginSafe(username, password) {
  if (
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    console.log("Invalid input");
    return undefined;
  }

  if (username.includes(" ") || password.length < 6) {
    console.log("Invalid login input");
    return undefined;
  }

  const stmt = db.prepare(
    "SELECT * FROM users WHERE username = ? AND password = ?"
  );

  return stmt.get(username, password);
}


// TEST CASES 
console.log('Test 1:', searchProductSafe('cement'));
console.log('Test 2:', searchProductSafe(''));
console.log('Test 3:', searchProductSafe('<script>'));
console.log('Test 4:', loginSafe('admin', 'admin123'));
console.log('Test 5:', loginSafe('admin', 'ab'));
console.log('Test 6:', loginSafe('ad min', 'pass123'));