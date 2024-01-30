const db = require('../loaders/db');

exports.getSearchList = async ({ getReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const sql = `
    SELECT profileUrl, nickname, sum
    FROM user
    WHERE nickname LIKE ?
    `;
  const params = [`%${getReq}%`];
  const [row] = await getConn.query(sql, params);
  getConn.release();
  return row;
};
