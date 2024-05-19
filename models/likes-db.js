const { db } = require('../loaders/db');
const LikesQueries = require('./likes-queries');
const FollowQueries = require('./follow-queries');

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
  const postOwnerInfo = await connectAndQuery(LikesQueries.getPostOwner, [
    targetId
  ]);
  const myNickname = await connectAndQuery(FollowQueries.getUsernameById, [
    myId
  ]);
  const data = result[0].affectedRows;
  return data && [postOwnerInfo[0][0].user_id, myNickname[0][0].nickname];
};

exports.undoLikePost = async postReq => {
  const [myId, targetId] = await postReq;
  const params = [myId, targetId];
  const result = await connectAndQuery(LikesQueries.undoLikePost, params);
  const data = result[0].affectedRows;
  return data && data;
};

exports.getMyLikeOnPost = async postReq => {
  const [myId, postId] = await postReq;
  const params = [myId, postId];
  const result = await connectAndQuery(LikesQueries.getMyLikeOnPost, params);
  const data = result[0];
  return data.length !== 0 ? 1 : 0;
};
