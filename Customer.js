const connection = require('./connection.js');

function Customer() {
  this.cart = []; // array of objects
  this.totalCost = 0.00;
}

Customer.prototype.calcCost = function() {
  this.totalCost = 0.00; // reset to zero before calculating total.
  this.cart.forEach((element) => {
    this.totalCost += element.price * element.quantity;
  });
}

Customer.prototype.addToCart = function(itemID, itemQuantity) {
  var query = 'SELECT item_id, product_name, price, stock_quantity FROM Products WHERE item_id = ?';
  connection.query(query, itemID, (err, res) => {

    var itemInfo = res[0];
    var remStock = itemInfo.stock_quantity - itemQuantity;

    var item = {
      id: itemID,
      quantity: itemQuantity,
      price: itemInfo.price
    }

    if (remStock > 0) {

      this.cart.push(item);
      this.calcCost();

      console.log(`\n========Your total is: $${this.totalCost}========\n`);
    } else {
      console.log('Insufficient quantity');
    }
  });
}

Customer.prototype.updateDatabase = function(itemID, stockQuantity) {
  var update = 'UPDATE Products SET stock_quantity = stock_quantity - ? WHERE item_id = ?';
  var search = [stockQuantity, itemID];
  connection.query(update, search, function(err, res) {});
}

module.exports = Customer;
