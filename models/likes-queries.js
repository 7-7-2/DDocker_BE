const query = require('./query-fns');

const queries = {
  likePost: query.buildInsert('likes', ['user_id', 'post_id']),
  undoLikePost: query.buildDelete('likes', ['user_id', 'post_id']),
  getMyLikeOnPost: `SELECT l.id
  FROM likes l
  WHERE user_id = ? AND post_id = ?`,
  getPostOwner: `SELECT p.user_id, u.nickname
  FROM post p
  LEFT JOIN user u
  ON u.public_id = p.user_id
  WHERE p.public_id = ?
  `
};

module.exports = queries;
