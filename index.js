var Customer = require('./Customer.js');

const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./connection.js');

var customer = new Customer();

connection.connect(function(err) {
  if (err) throw err;

  // switch depending if this is customer, manager, and supervisor
  switch ('customer') {
    case 'customer':
      storeInventory();
      break;
    case 'manager':
      break;
    case 'supervisor':
      break;
  }
  // customerSearch();
});

customerSearch = function() {

  console.log('\n')

  inquirer.prompt([{
    name: 'buy',
    type: 'input',
    message: 'What product would you like to buy (Enter id)?'
  }, {
    name: 'amount',
    type: 'input',
    message: 'How many would you like?'
  }]).then(function(answer) {
    var itemBought = answer.buy;
    var itemQuantity = answer.amount;

    customer.addToCart(itemBought, itemQuantity);

    storeInventory();
  });
}

function storeInventory() {
  var query = 'SELECT item_id, product_name, price FROM Products';
  connection.query(query, function(err, res) {
    console.log('\n------------Welcome to Fauxmazon!------------\n');
    console.log('id  product\n')
    res.forEach(function(item) {
      console.log(`${item.item_id}: ${item.product_name} ($${item.price})`);
    });
    customerSearch();
  });
}
