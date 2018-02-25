# Fauxmazon
Fauxmazon is a node app that operates on the command line. It attempts to simulate a very basic, bare bones e-commerce concept.

## How to Use
User can interface with application either as a `customer` or `manager`.

### Customer
Customer has the option to purchase as many products as they want as lone as it is in stock. Otherwise the customer will be prompt with `Insufficient quantity` for item.
<!-- GIF here -->
![Customer GIF Example](https://github.com/mbychkowski/fauxmazon/blob/master/docs/customer-example.gif)

### Manager
Manager has the option to add new items to the store or increase or decrease the stock to a set value.
<!-- GIF here -->
![Manager GIF Example](https://github.com/mbychkowski/fauxmazon/blob/master/docs/manager-example.gif)

## Built with
* [Node.js](https://nodejs.org/en/docs/)
* MySQL

### NPM packages
* [inquirer](https://www.npmjs.com/package/inquirer)
* [mysql](https://www.npmjs.com/package/mysql)
* [console.table](https://www.npmjs.com/package/console.table)
