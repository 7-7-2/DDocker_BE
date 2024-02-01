const query = require('./query-fns');

//TODO: SELECT 함수화
const queries = {
  getPostDetail: `SELECT 
  a.brand, a.menu, a.post_title,size, a.shot,caffeine, a.photo, a.created_at, b.profileUrl, b.nickname, b.sum 
  FROM post a 
  LEFT JOIN user b 
  ON a.user_id = b.public_id 
  WHERE a.user_id=?`,
  registerPost: query.buildInsert('post', [
    'user_id',
    'brand',
    'menu',
    'post_title',
    'size',
    'shot',
    'caffeine',
    'photo',
    'public_id'
  ]),
  deletePost: query.buildDelete('post', ['public_id']),
  writeComment: query.buildInsert('comment', ['user_id', 'post_id', 'content']),
  deleteComment: query.buildDelete('comment', ['post_id', 'id']),
  replyComment: query.buildInsert('reply', [
    'user_id',
    'comment_id',
    'content'
  ]),
  deleteReply: query.buildDelete('reply', ['id']),
  getComments: `SELECT 
  u.profileUrl, u.nickname, c.content, c.created_at 
  FROM user u
  LEFT JOIN comment c
  ON c.post_id = ?
  WHERE c.user_id = u.public_id
  `,
  getReply: `SELECT
  u.profileUrl, u.nickname, r.content, r.created_at 
  FROM user u
  LEFT JOIN reply r
  ON r.comment_id = ?
  WHERE r.user_id = u.public_id
  `,
  buildPatchQuery: query.buildPatchQuery
};

module.exports = queries;
