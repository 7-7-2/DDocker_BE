const query = require('./query-fns');

const queries = {
  getBrandData: `SELECT JSON_OBJECTAGG(brand_name, brand_items) AS coffee_menus
  FROM (
      SELECT brand_name, JSON_ARRAYAGG(
          JSON_OBJECT('brand', brand_name, 'caffeine', caffeine, 'menu', name)
      ) AS brand_items
      FROM brand
      GROUP BY brand_name
  ) AS temp`,
  getWeeklyPopularBrandMenu: `SELECT
  p.brand, p.menu, COUNT(*) AS menu_count
  FROM post p
  WHERE WEEK(created_at) = WEEK(NOW()) AND YEAR(created_at) = YEAR(NOW()) AND brand = ?
  GROUP BY brand, menu
  ORDER BY menu_count DESC
  LIMIT 1;`,
  getBrandRecentPosts: `SELECT 
  a.brand, a.menu, a.post_title as postTitle, a.size, a.shot,caffeine, a.photo, a.created_at as createdAt, a.public_id as postId,
  u.profileUrl, u.nickname, u.sum, u.public_id AS userId
  FROM post a
  INNER JOIN user u ON a.user_id = u.public_id
  WHERE WEEK(a.created_at) = WEEK(NOW()) AND YEAR(a.created_at) = YEAR(NOW()) AND a.brand = ?
  ORDER BY a.created_at DESC
  LIMIT 8;
  `,
  getBrandPopularPosts: `WITH TotalLikes AS (
    SELECT
    l.post_id, COUNT(*) AS like_count
    FROM
    likes l
    GROUP BY l.post_id
  )
  SELECT
  p.brand, p.menu, p.post_title as postTitle, p.size, p.shot, p.caffeine, p.photo, p.created_at as createdAt, p.public_id as postId,
  u.profileUrl, u.nickname, u.sum, u.public_id AS userId, like_count
  FROM
    post p
  LEFT JOIN TotalLikes l ON p.public_id = l.post_id
  INNER JOIN user u ON p.user_id = u.public_id
  WHERE WEEK(p.created_at) = WEEK(NOW()) AND YEAR(p.created_at) = YEAR(NOW()) AND
  p.brand = ?
  ORDER BY like_count DESC
  LIMIT 8;
  `
};
module.exports = queries;
