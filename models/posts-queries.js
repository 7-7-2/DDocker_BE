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
  deleteComment: query.buildDelete('comment', ['user_id', 'post_id', 'id']),
  replyComment: query.buildInsert('reply', [
    'user_id',
    'comment_id',
    'content'
  ]),
  deleteReply: query.buildDelete('reply', ['user_id', 'id']),
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
  getFollowingPosts: `
  SELECT
    p.public_id,
    p.post_title,
    p.brand,
    p.menu,
    p.shot,
    p.caffeine,
    p.photo,
    p.created_at,
    u.profileUrl,
    u.nickname,
    u.sum,
    COALESCE(SUM(COALESCE(com.total_comments, 0) + COALESCE(rep.total_replies, 0)), 0) AS total
FROM post p
INNER JOIN (
    SELECT a.public_id, a.profileUrl, a.nickname, a.sum
    FROM user a
    INNER JOIN (
        SELECT b.followed_user_id
        FROM follows b
        LEFT JOIN user c ON c.public_id = b.following_user_id
        WHERE c.public_id = ?
    ) list ON list.followed_user_id = a.public_id
) u ON u.public_id = p.user_id
LEFT JOIN (
    SELECT
        co.post_id,
        COUNT(DISTINCT co.id) AS total_comments
    FROM comment co
    GROUP BY co.post_id
) com ON com.post_id = p.public_id
LEFT JOIN (
    SELECT
        comment.post_id,
        COUNT(*) AS total_replies
    FROM reply
    INNER JOIN comment ON reply.comment_id = comment.id
    GROUP BY comment.post_id
) rep ON rep.post_id = com.post_id
GROUP BY p.public_id, p.post_title, p.brand, p.menu, p.shot, p.caffeine, p.photo, p.created_at, u.profileUrl, u.nickname, u.sum;
`,
  buildPatchQuery: query.buildPatchQuery
};

module.exports = queries;
