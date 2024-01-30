const searchDB = require('../models/search-db');

module.exports = {
  getUserInfo: async (req, res) => {
    return await searchDB.getSearchList(req);
  }
};
