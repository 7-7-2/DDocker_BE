const db = require('../loaders/db');

const postReport = async req => {
  const sql =
    'INSERT INTO report (reporter_id, post_id, reason, other ) VALUES (?,?,?,?)';
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0] : null;
};

const commentReport = async req => {
  const sql =
    'INSERT INTO report (reporter_id, post_id, reason, other, type, comment_id ) VALUES (?,?,?,?,?,?)';
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(sql, req).catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0] : null;
};

module.exports = {
  postReport,
  commentReport
};
