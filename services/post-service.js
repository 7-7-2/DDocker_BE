const postsDB = require('../models/posts-db');
const validatePostForm = require('../middlewares/validatePostForm');

module.exports = {
  getPostDetail: async (req, res) => {
    const result = await postsDB.getPostDetail(req);
    return result;
  },
  registerPost: async (req, res) => {
    const result = (await validatePostForm(req))
      ? await postsDB.registerPost(req)
      : await Promise.reject('Invalid Post Register Request');
    return result;
  }
};
