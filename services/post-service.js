const postsDB = require('../models/posts-db');

module.exports = {
  getPostDetail: async (req, res) => {
    const result = await postsDB.getPostDetail(req);
    return result;
  },
  registerPost: async (req, res) => {
    const result = req.body
      ? await postsDB.registerPost(req.body)
      : Promise.reject('Invalid Request');
    return result;
  }
};
