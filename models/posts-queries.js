const query = require('./query-fns');

const queries = {
  getPostDetail: `SELECT 
  a.brand, a.menu, a.post_title,size, a.shot,caffeine, a.photo, a.created_at, b.profileUrl, b.nickname, b.sum, b.public_id AS userId 
  FROM post a 
  LEFT JOIN user b 
  ON a.user_id = b.public_id 
  WHERE a.public_id=?`,
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
  getComments: `
  SELECT 
    u.profileUrl, 
    u.nickname, 
    c.content, 
    c.created_at, 
    c.id,
    COALESCE(rc.reply_count, 0) AS reply_count
  FROM 
    user u
  LEFT JOIN 
    comment c ON c.user_id = u.public_id
  LEFT JOIN (
    SELECT 
      comment_id, 
      COUNT(*) AS reply_count 
    FROM 
      reply 
    GROUP BY 
      comment_id) rc ON c.id = rc.comment_id
  WHERE 
    c.post_id = ?
  GROUP BY 
    c.id;
  `,
  getReply: `SELECT
  u.profileUrl, u.nickname, r.content, r.created_at, r.id
  FROM user u
  LEFT JOIN reply r
  ON r.comment_id = ?
  WHERE r.user_id = u.public_id
  `,
  getFollowingPosts: `
  WITH UserList AS (
    SELECT a.public_id, a.profileUrl, a.nickname, a.sum
    FROM user a
    INNER JOIN (
        SELECT b.followed_user_id
        FROM follows b
        WHERE b.following_user_id = ?
    ) list ON list.followed_user_id = a.public_id
  )
  SELECT
    p.public_id AS postId,
    p.post_title AS postTitle,
    p.brand,
    p.menu,
    p.shot,
    p.caffeine,
    p.photo,
    p.created_at AS createdAt,
    u.profileUrl,
    u.nickname,
    u.sum,
    u.public_id AS userId
  FROM post p
  INNER JOIN UserList u ON u.public_id = p.user_id
  ORDER BY p.created_at DESC
  LIMIT ?, 5;
`,
  getSocialCounts: `WITH TotalComments AS (
    SELECT
        co.post_id,
        COUNT(DISTINCT co.id) AS total_comments
    FROM comment co
    GROUP BY co.post_id
    ),
    TotalReplies AS (
        SELECT
            comment.post_id,
            COUNT(*) AS total_replies
        FROM reply
        INNER JOIN comment ON reply.comment_id = comment.id
        GROUP BY comment.post_id
    ),
    LikeCounts AS (
        SELECT post_id, COUNT(id) AS likeCounts
        FROM likes
        GROUP BY post_id
    )
    SELECT
            COALESCE(SUM(COALESCE(tc.total_comments, 0) + COALESCE(tr.total_replies, 0)), 0) AS totalComments,
            COALESCE(SUM(lk.likeCounts), 0) AS totalLikes
    FROM post p 
    LEFT JOIN TotalComments tc ON tc.post_id = p.public_id
    LEFT JOIN TotalReplies tr ON tr.post_id = tc.post_id
    LEFT JOIN LikeCounts lk ON lk.post_id = p.public_id
    WHERE p.public_id = ?
    GROUP BY p.public_id
    `,
  getRecentRanking: `SELECT
    brand, COUNT(brand) AS co
    FROM post p
    WHERE p.created_at BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW()-1
    GROUP BY brand
    ORDER BY co DESC 
    LIMIT 5;`,
  getAccumulatedRanking: `
  SELECT post.brand,COUNT(brand) AS co
  FROM post 
  GROUP BY brand 
  ORDER BY COUNT(brand) DESC;`,
  buildPatchQuery: query.buildPatchQuery,
  getDailyPopular: `
  WITH LikeCounts AS (
    SELECT post_id, COUNT(*) AS like_count
    FROM likes
    GROUP BY post_id
  )
  SELECT 
    p.photo, 
    p.brand, 
    p.menu, 
    p.shot, 
    p.caffeine, 
    p.public_id AS postId
  FROM post p
  JOIN LikeCounts l ON p.public_id = l.post_id
  WHERE DATE(p.created_at) = CURDATE()
  ORDER BY l.like_count DESC 
  LIMIT 4;
  `
};

module.exports = queries;
