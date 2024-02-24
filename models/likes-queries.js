const query = require('./query-fns');

const queries = {
  likePost: query.buildInsert('likes', ['user_id', 'post_id']),
  undoLikePost: query.buildDelete('likes', ['user_id', 'post_id']),
  getMyLikeOnPost: `SELECT l.id
  FROM likes l
  WHERE user_id = ? AND post_id = ?`
};

module.exports = queries;
