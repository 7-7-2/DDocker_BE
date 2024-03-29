const likesDB = require('../models/likes-db');

module.exports = {
  likePost: async (req, res) => {
    const result = await likesDB.likePost(req);
    return result ? result : Promise.reject('Failed to like post');
  },
  undoLikePost: async (req, res) => {
    const result = await likesDB.undoLikePost(req);
    return result ? result : Promise.reject('Failed to undo like post');
  },
  getMyLikeOnPost: async (req, res) => {
    const result = await likesDB.getMyLikeOnPost(req);
    return result ?? Promise.reject('Failed to check if the user liked post');
  }
};
