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
    choices: ['customer', 'manager']
  }]).then(function(answer) {

    loginType = answer.loginAs;

    storeInventory(loginType);

  });
});

function storeInventory(loginType) {
  var query = 'SELECT item_id, product_name, department_name, price, stock_quantity FROM Products';
  connection.query(query, function(err, res) {

    console.log('\n------------Welcome to Fauxmazon!------------\n');
    console.table(res);
    console.log('\n')

    // switch depending if this is customer, manager, and supervisor
    switch (loginType) {
      case 'customer':
        customerSearch(res);
        break;
      case 'manager':
        managerSearch();
        break;
    }
  });
}

customerSearch = function(res) {

  console.log('\n')

  inquirer.prompt([{
    name: 'buy',
    type: 'input',
    message: 'What product would you like to buy (Enter id)?'
  }, {
    name: 'amount',
    type: 'input',
    message: 'How many would you like?'
  }, {
    name: 'endConnection',
    type: 'confirm',
    message: 'Are you done shopping?'
  }]).then(function(answer) {

    var itemID = parseInt(answer.buy);
    var itemQuantity = answer.amount;
    // var itemIndex = res.map(function(element) {
    //   return element.item_id;
    // }).indexOf(itemBought);

    var query = 'SELECT item_id, product_name, price, stock_quantity FROM Products WHERE item_id = ?';
    connection.query(query, itemID, function(err, res) {

      var itemInfo = res[0];
      var stockQuantity = itemInfo.stock_quantity;
      var price = itemInfo.price;

      if (stockQuantity - itemQuantity > 0) {
        customer.updateDatabase(itemID, itemQuantity, stockQuantity);
        customer.addToCart(itemID, itemQuantity, price);
      } else {
        console.log('Insufficient quantity');
      }

      if (answer.endConnection) {
        connection.end();
      } else {
        storeInventory('customer');
      }
    });
  });
}

managerSearch = function() {

  console.log('\n')

  inquirer.prompt([{
    name: 'optionDo',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      '[1] Add a product to Fauxmazon',
      '[2] Increase stock of an existing item',
      '[3] End manager session'
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
    } else if (managerOpt === '2') {
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
    } else {
      connection.end();
    }
  });
}
