const postsDB = require('../models/posts-db');
const validatePostForm = require('../middlewares/validatePostForm');

module.exports = {
  getPostDetail: async (req, res) => {
    const result = await postsDB.getPostDetail(req);
    return result ? result : Promise.reject('Failed to get post detail');
  },
  registerPost: async (req, res) => {
    const result = (await validatePostForm(req))
      ? await postsDB.registerPost(req)
      : await Promise.reject('Invalid Post Register Request');
    return result;
  },
  deletePost: async (req, res) => {
    const result = await postsDB.deletePost(req);
    return result ? result : Promise.reject('Failed to delete post');
  },
  updatePost: async (req, res) => {
    const result = await postsDB.updatePost(req);
    return result ? result : Promise.reject('Failed to update post');
  },
  writeComment: async (req, res) => {
    const result = await postsDB.writeComment(req);
    return result ? result : Promise.reject('Failed to write comment');
  },
  deleteComment: async (req, res) => {
    const result = await postsDB.deleteComment(req);
    return result ? result : Promise.reject('Failed to delete comment');
  },
  replyComment: async (req, res) => {
    const result = await postsDB.replyComment(req);
    return result ? result : Promise.reject('Failed to reply comment');
  },
  deleteReply: async (req, res) => {
    const result = await postsDB.deleteReply(req);
    return result ? result : Promise.reject('Failed to delete reply');
  }
};
