const connection = require('./connection.js');

function Item(id, name, stock, quantity, price) {
  this.id = id;
  this.name = name;
  this.stock = stock;
  this.quantity = quantity;
  this.price = price;
  this.totalItemCost = this.quantity * this.price;
  this.isAvailable = true;
}

Item.prototype.updateDatabase = function() {
  this.stock -= this.quantity;

  var update = 'UPDATE Products SET stock_quantity = ? WHERE item_id = ?';
  var search = [this.stock, this.id];
  connection.query(update, search, function(err, res) {});
}

Item.prototype.checkAvailability = function() {
  if (this.stock - this.quantity > 0) {
    this.isAvailable = true;
  } else {
    this.isAvailable = false;
  }
}

module.exports = Item;
