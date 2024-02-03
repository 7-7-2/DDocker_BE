const coffeeDB = require('../models/coffee-db');

module.exports = {
  getCoffeeInfoSum: async (req, res) => {
    const result = await coffeeDB.getCoffeeInfoSum(req);

    if (result && result.length > 0) {
      const coffeeInfo = {
        item: {
          brand: result[0].brand,
          caffeine: result[0].caffeine
        },
        sumItem: {
          totalCaffeine: result[0].caffeineSum,
          itemCount: result[0].allCount
        }
      };
      return coffeeInfo
        ? { coffeeInfo }
        : Promise.reject('Failed to get coffeeInfoSum');
    }
  },
  getDaySum: async ({ getReq }) => {
    const dates = ['YEAR', 'MONTH', 'WEEK'];
    const results = await Promise.all(
      dates.map(async date => ({
        [date]: await coffeeDB.getDaySum({ getReq, date })
      }))
    );
    return results
      ? results.reduce((acc, result) => ({ ...acc, ...result }), {})
      : Promise.reject('Failed to get daySum');
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
    return result ? result : Promise.reject('Failed to get calendar');
  }
};
