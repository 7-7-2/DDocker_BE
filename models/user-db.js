const db = require('../loaders/db');

const setUserOauth = async req => {
  const sql =
    'INSERT INTO user (profileUrl, useremail, social, public_id) VALUES (?,?,?,?)';
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0] : null;
};

const setUserInit = async req => {
  const sql =
    'UPDATE user SET nickname=?, gender=?, brand=?, sum = 0 WHERE  public_id = ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0] : null;
};

const getUserAuthInfo = async req => {
  const sql =
    'SELECT COUNT(*), public_id FROM user WHERE useremail = ? AND social= ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  const resault = await conn.query(sql, req).catch(err => console.log(err));
  const signInInfo = resault[0][0];
  getConn.release();
  return signInInfo['COUNT(*)'] ? signInInfo['public_id'] : null;
};

const getUserInfo = async req => {
  const sql =
    'SELECT nickname, brand, sum, profileUrl,public_id as userId FROM user WHERE public_id = ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  const resault = await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
  return resault[0][0]['nickname'] ? resault[0][0] : null;
};

const patchUserInfo = async req => {
  const patchInfo = [];
  for (const [key, value] of Object.entries(req[0])) {
    const update = `${key} = '${value}'`;
    patchInfo.push(update);
  }
  const sql = `UPDATE user SET ${patchInfo} WHERE  public_id = '${req[1]}'`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql).catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0] : null;
};

const checkUserNickname = async req => {
  const sql = `SELECT COUNT(*) FROM user WHERE nickname = '${req}'`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql).catch(err => console.log(err));
  getConn.release();
  return result[0][0]['COUNT(*)'] ? 1 : 0;
};

const getUserPosts = async req => {
  const pages = 18 * req[1];
  const sql = ` SELECT
    (SELECT COUNT(*) FROM post WHERE user_id = '${req[0]}') AS 'allCount',
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'photo', s.photo,
        'postId', s.postId
      )
    ) AS 'posts'
  FROM ( SELECT photo, public_id as postId FROM
    post
  WHERE
    user_id = '${req[0]}'
  ORDER BY
    created_at DESC
  LIMIT 18 OFFSET ${pages}) as s;`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql).catch(err => console.log(err));
  const posts = result[0][0].posts.length;
  getConn.release();
  return posts !== 0 ? result[0][0] : null;
};

const getUserFollowingCount = async req => {
  const sql = `SELECT COUNT(*) FROM follows WHERE following_user_id = '${req}'`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql).catch(err => console.log(err));
  const count = result[0][0]['COUNT(*)'];
  getConn.release();
  return count && count;
};

const getUserFollowedCount = async req => {
  const sql = `SELECT COUNT(*) FROM follows WHERE followed_user_id = '${req}'`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql).catch(err => console.log(err));
  const count = result[0][0]['COUNT(*)'];
  getConn.release();
  return count && count;
};

module.exports = {
  patchUserInfo,
  setUserInit,
  setUserOauth,
  getUserInfo,
  getUserAuthInfo,
  checkUserNickname,
  getUserPosts,
  getUserFollowingCount,
  getUserFollowedCount
};
