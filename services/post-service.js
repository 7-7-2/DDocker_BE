const postsDB = require('../models/posts-db');

module.exports = {
  getPostDetail: async (req, res) => {
    await postsDB.getPostDetail(req);
  }
};
