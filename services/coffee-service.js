const coffeeDB = require('../models/coffee-db');

module.exports = {
  getCoffeeInfoSum: async (req, res) => {
    const sum = await coffeeDB.getCoffeeInfoSum(req);
    return sum;
  },
  getDaySum: async (req, res) => {
    const sum = await coffeeDB.getDaySum(req);
    return sum;
  },

  getCalendar: async (req, res) => {
    const sum = await coffeeDB.getCalendar(req);
    return sum;
  }
};
