const db = require('../loaders/db');
const LikesQueries = require('./likes-queries');

const connectAndQuery = async (...queryAndParam) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(...queryAndParam);
  getConn.release();
  return result;
};

exports.likePost = async postReq => {
  const [myId, targetId] = await postReq;
  const params = [myId, targetId];
  const result = await connectAndQuery(LikesQueries.likePost, params);
  console.log('🚀 ~ result:', result);
  const data = result[0].affectedRows;
  console.log('🚀 ~ data:', data);
  return data && data;
};

exports.undoLikePost = async postReq => {
  const [myId, targetId] = await postReq;
  const params = [myId, targetId];
  const result = await connectAndQuery(LikesQueries.undoLikePost, params);
  const data = result[0].affectedRows;
  return data && data;
};
