const searchDB = require('../models/search-db');

module.exports = {
  getUserInfo: async (req, res) => {
    const result = await searchDB.getSearchList(req);
    return result ? result : Promise.reject('Failed to get userInfo');
  },
  getUserInfoMore: async (req, res) => {
    const result = await searchDB.getSearchListMore(req);
    return result ? result : Promise.reject('Failed to get userInfoMore');
  }
};
