const db = require('../loaders/db');

const setUserOauth = async req => {
  const sql =
    'INSERT INTO user (profileUrl, useremail, social, public_id) VALUES (?,?,?,?)';
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
};

const setUserInit = async req => {
  const sql =
    'UPDATE user SET nickname=?, gender=?, brand=?, sum = 0 WHERE  public_id = ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
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
    'SELECT nickname, brand, sum, profileUrl FROM user WHERE  public_id = ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  const resault = await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
  return resault[0][0]['nickname'] ? resault : null;
};

const patchUserInfo = async req => {
  const patchInfo = [];
  for (const [key, value] of Object.entries(req[0])) {
    const update = `${key} = '${value}'`;
    patchInfo.push(update);
  }
  const sql = `UPDATE user SET ${patchInfo} WHERE  public_id = ${req[1]}`;
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql).catch(err => console.log(err));
  getConn.release();
};

const checkUserNickname = async req => {
  const sql = `SELECT COUNT(*) FROM user WHERE nickname = '${req}'`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql).catch(err => console.log(err));
  getConn.release();
  return result[0][0]['COUNT(*)'] ? true : false;
};

const getUserPosts = async req => {
  const sql = `SELECT * FROM post WHERE user_id = '${req}'`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql).catch(err => console.log(err));
  getConn.release();
  return result;
};

module.exports = {
  patchUserInfo,
  setUserInit,
  setUserOauth,
  getUserInfo,
  getUserAuthInfo,
  checkUserNickname,
  getUserPosts
};
