const db = require('../loaders/db');

exports.getPostDetail = async postReq => {
  const sql = `SELECT 
  a.brand, a.menu, a.post_title,size, a.shot,caffeine, a.photo, a.created_at, b.profileUrl, b.nickname, b.sum 
  FROM post a 
  LEFT JOIN user b 
  ON a.user_id = b.id 
  WHERE a.id=?`;
  const params = [postReq];
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql, params);
  const data = result[0][0];
  getConn.release();
  return data && data;
};

exports.registerPost = async postReq => {
  const { user_id, brand, menu, post_title, size, shot, caffeine, photo } =
    await postReq;
  const sql = `INSERT INTO post ( user_id, brand, menu, post_title, size, shot, caffeine, photo  ) VALUES ( ?,?,?,?,?,?,?,? )`;
  const params = [
    user_id,
    brand,
    menu,
    post_title,
    size,
    shot,
    caffeine,
    photo
  ];
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql, params);
  const data = result[0];
  getConn.release();
  return data && data;
};
