const connection = require('./connection.js');
const Item = require('./Item.js');

function Customer() {
  this.cart = []; // array of objects
  this.totalCost = 0.00;
}

Customer.prototype.calcCost = function() {
  this.totalCost = 0.00; // reset to zero before calculating total.
  this.cart.forEach((element) => {
    this.totalCost += element.totalItemCost;
  });
}

Customer.prototype.addToCart = function(itemID, itemQuantity) {
  var query = 'SELECT item_id, product_name, price, stock_quantity FROM Products WHERE item_id = ?';
  connection.query(query, itemID, (err, res) => {
    var itemInfo = res[0];

    var item = new Item(
      itemInfo.item_id,
      itemInfo.product_name,
      itemInfo.stock_quantity,
      itemQuantity,
      itemInfo.price);

    item.checkAvailability();
    if (item.isAvailable) {
      this.cart.push(item);
      item.updateDatabase();
      this.calcCost();
      console.log(`Your total is: $${this.totalCost}`);
    } else {
      console.log('Insufficient quantity');
    }
  });
}

module.exports = Customer;
