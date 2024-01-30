const searchService = require('../services/search-service');

module.exports = {
  getUserInfo: async (req, res) => {
    const getReq = req.params.userId;
    const setRes = await searchService.getUserInfo({ getReq }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
    return res.status(200).json({ setRes });
  }
};
