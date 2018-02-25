var Customer = require('./Customer.js');
var Manager = require('./Manager.js');

const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./connection.js');

var customer = new Customer();
var manager = new Manager();

connection.connect(function(err) {
  if (err) throw err;

  inquirer.prompt([{
    type: 'list',
    name: 'loginAs',
    message: 'Login as a: ',
    choices: ['customer', 'manager', 'supervisor']
  }]).then(function(answer) {

    loginType = answer.loginAs;

    storeInventory(loginType);

  });
});

function storeInventory(loginType) {
  var query = 'SELECT item_id, product_name, price FROM Products';
  connection.query(query, function(err, res) {
    console.log('\n------------Welcome to Fauxmazon!------------\n');

    console.log('id  product\n')
    res.forEach(function(item) {
      console.log(`${item.item_id}: ${item.product_name} ($${item.price})`);
    });

    // switch depending if this is customer, manager, and supervisor
    switch (loginType) {
      case 'customer':
        customerSearch();
        break;
      case 'manager':
        managerSearch();
        break;
    }
  });
}

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

    storeInventory('customer');
  });
}

managerSearch = function() {

  console.log('\n')

  inquirer.prompt([{
    name: 'optionDo',
    type: 'list',
    message: 'What would you like to do?',
    choices:
    [
      '[1] Add a product to Fauxmazon',
      '[2] Increase stock of an existing item'
    ]
  }]).then(function(answer) {

    var managerOpt = answer.optionDo[1]

    if (managerOpt === '1') {
      inquirer.prompt([{
        name: 'addItem',
        type: 'input',
        message: 'Enter new item [id, name, department, price, quantity]'
      }]).then(function(answer) {

        var newItemArr = answer.addItem.split(',');
        var itemID = parseInt(newItemArr[0]);
        var productName = newItemArr[1].trim();
        var deptName = newItemArr[2].trim();
        var price = parseFloat(newItemArr[3]);
        var stockQuantity = parseInt(newItemArr[4]);

        manager.addProduct(itemID, productName, deptName, price, stockQuantity);
        storeInventory('manager');
      });
    } else {
      inquirer.prompt([{
        name: 'addIventory',
        type: 'input',
        message: 'Enter product id and stock amount [id, quantity]'
      }]).then(function(answer) {

        var newInventoryCount = answer.addIventory.split(',');
        var itemID = parseInt(newInventoryCount[0]);
        var stockQuantity = parseInt(newInventoryCount[1]);

        manager.addToInventory(itemID, stockQuantity);
        storeInventory('manager');
      });
    }
  });
}
