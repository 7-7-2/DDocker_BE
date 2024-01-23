const util = require('util');
const db = require('../loaders/db');

// const query = util.promisify(db.query).bind(db);

exports.getPostDetail = async ({ postReq }) => {
  const sql = `SELECT 
  a.brand, a.menu, a.post_title,size, a.shot,caffeine, a.photo, a.created_at, b.profileUrl, b.nickname, b.sum 
  FROM post a 
  LEFT JOIN user b 
  ON a.user_id = b.id 
  WHERE a.id=?`;
  const params = [postReq];
  const conn = await db();
  const result = await conn.query(sql, params).catch(err => console.log(err));
  return result;
};
