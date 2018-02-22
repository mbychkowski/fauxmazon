const connection = require('./connection.js');
const Item = require('./Item.js');

function Customer() {
  this.cart = []; // array of objects
  this.totalCost = 0; // currency is usd
}

Customer.prototype.calcCost = function() {
  this.cart.forEach(function(element) {
    this.totalCost += element.price;
  });
}

Customer.prototype.addToCart = function(itemID, itemQuantity) {
  var query = 'SELECT item_id, product_name, price, stock_quantity FROM Products WHERE item_id = ?';
  var cart = this.cart;
  connection.query(query, itemID, function(err, res) {
    var itemInfo = res[0];

    var item = new Item(
      itemInfo.item_id,
      itemInfo.product_name,
      itemInfo.stock_quantity,
      itemQuantity,
      itemInfo.price);

    item.checkAvailability();
    if (item.isAvailable) {
      item.updateDatabase();
      cart.push(item);
    } else {
      console.log('Insufficient quantity');
    }
  });
}
module.exports = Customer;
