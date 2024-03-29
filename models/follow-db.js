const db = require('../loaders/db');
const FollowQueries = require('./follow-queries');

const connectAndQuery = async (...queryAndParam) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(...queryAndParam);
  getConn.release();
  return result;
};

exports.followUser = async postReq => {
  const [myId, targetId] = await postReq;
  const params = [myId, targetId];
  const result = await connectAndQuery(FollowQueries.followUser, params);
  const data = result[0];
  return data && data;
};
exports.unfollowUser = async postReq => {
  const [myId, targetId] = await postReq;
  const params = [myId, targetId];
  const result = await connectAndQuery(FollowQueries.unfollowUser, params);
  const data = result[0];
  return data && data;
};
exports.getFollowingList = async postReq => {
  const targetId = await postReq;
  const params = [targetId];
  const result = await connectAndQuery(FollowQueries.getFollowingList, params);
  const data = result[0];
  return data && data;
};
exports.getFollowerList = async postReq => {
  const targetId = await postReq;
  const params = [targetId];
  const result = await connectAndQuery(FollowQueries.getFollowerList, params);
  const data = result[0];
  return data && data;
};
exports.checkFollowing = async postReq => {
  const [myId, targetId] = await postReq;
  const params = [myId, targetId];
  const result = await connectAndQuery(FollowQueries.checkFollowing, params);
  const data = result[0][0]['COUNT(*)'];
  return data !== 0 ? true : 0;
};
