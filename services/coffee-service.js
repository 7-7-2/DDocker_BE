const coffeeDB = require('../models/coffee-db');

module.exports = {
  getTodayCoffeeInfo: async req => {
    const res = await coffeeDB.getCoffeeInfoSum(req);
    return res ? res : Promise.reject('Failed to get coffeeInfoSum');
  },
  getDaySum: async getReq => {
    const userid = getReq[0];
    const dates = [
      { type: 'YEAR', query: `YEAR(created_at) = YEAR('${getReq[1]}')` },
      {
        type: 'MONTH',
        query: `YEAR(created_at) = YEAR('${getReq[1]}') AND MONTH(created_at) = MONTH('${getReq[1]}')`
      },
      { type: 'WEEK', query: 'WEEK(created_at, 1) = WEEK(CURDATE(), 1)' }
    ];
    const results = await Promise.all(
      dates.map(async date => ({
        [date.type]: await coffeeDB.getDaySum({ userid, date })
      }))
    );
    return results
      ? results.reduce((acc, result) => ({ ...acc, ...result }), {})
      : Promise.reject('Failed to get daySum');
  },

  getCalendar: async (req, res) => {
    const sum = await coffeeDB.getCalendar(req);
    const days = sum.map(item => {
      const day = item.day.toString().padStart(2, '0');
      const month = req[1].split('-')[1];
      const caffeineSum = item.caffeineSum;
      const days = {
        day: `${month}-${day}`,
        caffeineSum: caffeineSum
      };
      return days;
    });

    const result = {
      year: req[1].split('-')[0],
      month: req[1].split('-')[1],
      days: days
    };
    return result ? result : Promise.reject('Failed to get calendar');
  }
};
