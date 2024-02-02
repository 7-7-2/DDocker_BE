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

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    const result = {
      Calendar: [
        {
          year: currentYear,
          month: currentMonth,
          days: {}
        }
      ]
    };
    if (sum && sum.length > 0) {
      sum.forEach(row => {
        const day = row.day;
        const caffeineSum = row.CaffeineSum;

        if (day <= lastDayOfMonth) {
          result.Calendar[0].days[day] = {
            caffeineSum: caffeineSum,
            recommend: caffeineSum >= 400 ? 'true' : 'false'
          };
        }
      });
    }
    return result;
  }
};
