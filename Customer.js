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

Customer.prototype.addToCart = function(itemID, itemQuantity, price) {

  // item to be pushed to cart
  var item = {
    id: itemID,
    quantity: itemQuantity,
    price: price
  }

  this.cart.push(item);
  this.calcCost();

  console.log(`\n========Your total is: $${this.totalCost}========\n`);

}

Customer.prototype.updateDatabase = function(itemID, itemQuantity) {

  var update = 'UPDATE Products SET stock_quantity = stock_quantity - ? WHERE item_id = ?';
  var search = [itemQuantity, itemID];
  connection.query(update, search, function(err, res) {});
};

module.exports = Customer;
