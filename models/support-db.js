const { db } = require('../loaders/db');
const supportQueries = require('./support-queries');

const getNoticesList = async () => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn
    .query(supportQueries.getNoticesList)
    .catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0] : null;
};

const getNoticeDetail = async req => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn
    .query(supportQueries.getNoticeDetail, req)
    .catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0][0] : null;
};

const getFAQ = async () => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn
    .query(supportQueries.getFAQ)
    .catch(err => console.log(err));
  getConn.release();
  return result[0] ? result[0] : null;
};

module.exports = {
  getNoticesList,
  getNoticeDetail,
  getFAQ
};
