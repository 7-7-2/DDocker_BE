const db = require('../loaders/db');

const setUserOauth = async req => {
  console.log(req);
  const sql = 'INSERT INTO user (profileUrl, useremail, social) VALUES (?,?,?)';
  const conn = await db();
  await conn.query(sql, req).catch(err => console.log(err));
};

const setUserInit = async req => {
  const sql =
    'UPDATE user SET nickname=?, gender=?, brand=?, sum = 0 WHERE id = ?';
  const conn = await db();
  await conn.query(sql, req).catch(err => console.log(err));
};

const getUserInfo = async req => {
  const sql = 'SELECT nickname, brand, sum FROM user WHERE id = ?';
  const conn = await db();
  const resault = await conn.query(sql, req).catch(err => console.log(err));
  return resault[0][0]['nickname'] ? resault : null;
};

const getUserAuthInfo = async req => {
  const sql = 'SELECT COUNT(*), id FROM user WHERE useremail = ? AND social= ?';
  const conn = await db();
  const resault = await conn.query(sql, req).catch(err => console.log(err));
  const signInInfo = resault[0][0];
  console.log(resault[0][0]['COUNT(*)']);
  return signInInfo['COUNT(*)'] ? signInInfo['id'] : null;
};

module.exports = { setUserInit, setUserOauth, getUserInfo, getUserAuthInfo };
