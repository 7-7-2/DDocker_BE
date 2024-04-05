const coffeeService = require('../services/coffee-service');

module.exports = {
  getCoffeeInfo: async (req, res) => {
    const setRes = await coffeeService
      .getTodayCoffeeInfo(req.userId)
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: err
        });
      });
    return res.status(200).json(setRes);
  },

  getDaySum: async (req, res) => {
    const getReq = req.userId;
    const setRes = await coffeeService.getDaySum({ getReq }).catch(err => {
      res.status(500).json({
        message: err
      });
    });
    return res.status(200).json({ setRes });
  },

  getCalendar: async (req, res) => {
    const activeMonth = req.params.activeMonth;
    const getReq = [req.userId, activeMonth];
    const setRes = await coffeeService.getCalendar(getReq).catch(err => {
      res.status(500).json({
        message: err
      });
    });
    return res.status(200).json({ setRes });
  }
};
