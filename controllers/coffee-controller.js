const coffeeService = require('../services/coffee-service');

module.exports = {
  getCoffeeInfo: async (req, res) => {
    const getReq = req.params.userId;
    const setRes = await coffeeService
      .getCoffeeInfoSum({ getReq })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: err
        });
      });
    return res.status(200).json({ setRes });
  },

  getDaySum: async (req, res) => {
    const getReq = req.params.userId;
    const setRes = await coffeeService.getDaySum({ getReq }).catch(err => {
      res.status(500).json({
        message: err
      });
    });

    return res.status(200).json({ setRes });
  },

  getCalendar: async (req, res) => {
    const getReq = req.params.userId;
    try {
      const setRes = await coffeeService.getCalendar({ getReq });
      res.status(200).json({ setRes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
