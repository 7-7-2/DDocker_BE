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

const getUserInfo = async req => {
  const sql = 'SELECT id, nickname, brand, sum FROM user WHERE id = ?';
  const conn = await db();
  const getConn = await conn.getConnection();
  const resault = await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
  return resault[0][0]['nickname'] ? resault : null;
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

module.exports = { setUserInit, setUserOauth, getUserInfo, getUserAuthInfo };
