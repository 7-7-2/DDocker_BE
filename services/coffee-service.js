const coffeeDB = require('../models/coffee-db');

module.exports = {
  getCoffeeInfoSum: async (req, res) => {
    const sum = await coffeeDB.getCoffeeInfoSum(req);
    return sum;
  }
};
