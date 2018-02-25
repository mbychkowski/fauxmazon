const connection = require('./connection.js');
const Item = require('./Item.js');

function Manager() {

}

Manager.prototype.addToInventory = function(itemID, stockQuantity) {
  var update = 'UPDATE Products SET stock_quantity = ? WHERE item_id = ?';
  var search = [stockQuantity, itemID];
  connection.query(update, search, function(err, res) {});
};

Manager.prototype.addProduct = function(itemID, productName, deptName, price, stockQuantity) {
  var insert = 'INSERT INTO Products SET item_id = ?, product_name = ?, department_name = ?, price = ?, stock_quantity = ?';
  var search = [itemID, productName, deptName, price, stockQuantity];
  connection.query(insert, search, function(err, res) {});
}

module.exports = Manager;
