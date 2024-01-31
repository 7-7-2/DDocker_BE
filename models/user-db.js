const db = require('../loaders/db');

const setUserOauth = async req => {
  const sql = 'INSERT INTO user (profileUrl, useremail, social) VALUES (?,?,?)';
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
};

const setUserInit = async req => {
  const sql =
    'UPDATE user SET nickname=?, gender=?, brand=?, sum = 0 WHERE id = ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
};

const getUserAuthInfo = async req => {
  const sql = 'SELECT COUNT(*), id FROM user WHERE useremail = ? AND social= ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  const resault = await conn.query(sql, req).catch(err => console.log(err));
  const signInInfo = resault[0][0];
  getConn.release();
  return signInInfo['COUNT(*)'] ? signInInfo['id'] : null;
};

const getUserInfo = async req => {
  const sql = 'SELECT nickname, brand, sum, profileUrl FROM user WHERE id = ?';
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
  const sql = `UPDATE user SET ${patchInfo} WHERE id = ${req[1]}`;
  const conn = await db();
  const getConn = await conn.getConnection();
  await getConn.query(sql).catch(err => console.log(err));
  getConn.release();
};

const checkUserNickname = async req => {
  const sql = `SELECT COUNT(*) FROM user WHERE nickname = '${req}'`;
  const conn = await db();
  const getConn = await conn.getConnection();
  const resault = await getConn.query(sql).catch(err => console.log(err));
  getConn.release();
  return resault[0][0]['COUNT(*)'] ? true : false;
};

module.exports = {
  patchUserInfo,
  setUserInit,
  setUserOauth,
  getUserInfo,
  getUserAuthInfo,
  checkUserNickname
};
