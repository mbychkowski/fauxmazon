const connection = require('./connection.js');
const Item = require('./Item.js');

function Manager() {

}

Manager.prototype.addToInventory(productName, stockQuantity) {
  var update = 'UPDATE Products SET stock_quantity = ? WHERE item_id = ?';
  var search = [stockQuantity, productName];
  connection.query(query, search, (err, res) {

  });
};

Manager.prototype.addProduct(itemID, productName, deptName, price, stockQuantity) {
  var insert = 'INSERT INTO Products ?';
  var search = [itemID, productName, deptName, price, stockQuantity];
  connection.query(insert, search, (err, res) {

  });
}
