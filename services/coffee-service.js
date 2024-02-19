const coffeeDB = require('../models/coffee-db');

module.exports = {
  getTodayCoffeeInfo: async req => {
    const res = await coffeeDB.getCoffeeInfoSum(req);
    return res ? res : Promise.reject('Failed to get coffeeInfoSum');
  },
  getDaySum: async ({ getReq }) => {
    const dates = [
      { type: 'YEAR', query: 'YEAR(created_at) = YEAR(CURDATE())' },
      { type: 'MONTH', query: 'MONTH(created_at) = MONTH(CURDATE())' },
      { type: 'WEEK', query: 'WEEK(created_at, 1) = WEEK(CURDATE(), 1)' }
    ];

    const results = await Promise.all(
      dates.map(async date => ({
        [date.type]: await coffeeDB.getDaySum({ getReq, date })
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
