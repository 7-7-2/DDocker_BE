const postsDB = require('../models/posts-db');
const validatePostForm = require('../middlewares/validatePostForm');

// + getPoset,deletePost,writeComment 예외처리, updatePost props 0개 테스트
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
  },
  deletePost: async (req, res) => {
    const result = await postsDB.deletePost(req);
    return result;
  },
  updatePost: async (req, res) => {
    const result = await postsDB.updatePost(req);
    return result;
  },
  writeComment: async (req, res) => {
    const result = await postsDB.writeComment(req);
    return result;
  }
};
