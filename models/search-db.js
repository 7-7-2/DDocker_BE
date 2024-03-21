const db = require('../loaders/db');

exports.getSearchList = async ({ searchReq }) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const sql = `
    SELECT profileUrl as url, nickname, sum as caffeine, public_id as userId
    FROM user
    WHERE LOWER(nickname) LIKE LOWER(?) LIMIT 5
    `;
  const params = [`%${searchReq}%`];
  const result = await getConn.query(sql, params);
  const data = result[0];
  getConn.release();
  return data;
};
