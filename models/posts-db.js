const db = require('../loaders/db');
const PostQueries = require('./posts-queries');
const { nanoid } = require('nanoid');

const connectAndQuery = async (...queryAndParam) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(...queryAndParam);
  getConn.release();
  return result;
};

exports.getPostDetail = async postReq => {
  const params = [postReq];
  const result = await connectAndQuery(PostQueries.getPostDetail, params);
  const data = result[0][0];
  return data && data;
};

exports.registerPost = async postReq => {
  const { brand, menu, post_title, size, shot, caffeine, photo } =
    await postReq[1];
  const params = [
    postReq[0],
    brand,
    menu,
    post_title,
    size,
    shot,
    caffeine,
    photo,
    nanoid()
  ];
  const result = await connectAndQuery(PostQueries.registerPost, params);
  const data = result[0];
  return data && data;
};

exports.deletePost = async postReq => {
  await postReq;
  const params = [postReq];
  const result = await connectAndQuery(PostQueries.deletePost, params);
  const data = result[0];
  return data && data;
};

exports.updatePost = async postReq => {
  const [postId, updateTo] = await postReq;
  const sql = await PostQueries.buildPatchQuery(postId, updateTo);
  const result = await connectAndQuery(sql);
  const data = result[0];
  return data && data;
};

exports.writeComment = async postReq => {
  const [userId, postId, content] = await postReq;
  const params = [userId, postId, content];
  const result = await connectAndQuery(PostQueries.writeComment, params);
  const data = result[0];
  return data && data;
};

exports.deleteComment = async postReq => {
  const [userId, postId, commentId] = await postReq;
  const params = [userId, postId, commentId];
  const result = await connectAndQuery(PostQueries.deleteComment, params);
  const data = result[0].affectedRows;
  return data && data;
};

exports.replyComment = async postReq => {
  const [userId, commentId, reply] = await postReq;
  const params = [userId, commentId, reply];
  const result = await connectAndQuery(PostQueries.replyComment, params);
  const data = result[0];
  return data && data;
};

exports.deleteReply = async postReq => {
  const [userId, replyId] = await postReq;
  const params = [userId, replyId];
  const result = await connectAndQuery(PostQueries.deleteReply, params);
  const data = result[0].affectedRows;
  return data && data;
};

exports.getComments = async postReq => {
  await postReq;
  const params = [postReq];
  const result = await connectAndQuery(PostQueries.getComments, params);
  const data = result[0];
  return data && data;
};

exports.getReply = async postReq => {
  await postReq;
  const params = [postReq];
  const result = await connectAndQuery(PostQueries.getReply, params);
  const data = result[0];
  return data && data;
};

exports.getFollowingPosts = async postReq => {
  const [userId, pageNum] = await postReq;
  const offset = pageNum && (pageNum - 1) * 5;
  const params = [userId, offset];
  const result = await connectAndQuery(PostQueries.getFollowingPosts, params);
  const data = result[0];
  return (
    data && {
      results: data,
      next: data.length < 5 ? undefined : Number(pageNum) + 1
    }
  );
};

exports.getSocialCounts = async postReq => {
  await postReq;
  const params = [postReq];
  const result = await connectAndQuery(PostQueries.getSocialCounts, params);
  const data = result[0];
  return data && data;
};

exports.getRanking = async postReq => {
  const rec = await connectAndQuery(PostQueries.getRecentRanking);
  const weekly = rec && rec[0].map(i => i.brand);
  const lackOf = rec && 5 - rec[0].length;
  const range = lackOf && [...Array.from({ length: lackOf }, (_, i) => i)];
  const acc =
    rec &&
    rec[0].length < 5 &&
    (await connectAndQuery(PostQueries.getAccumulatedRanking));
  const accPopular = acc && acc[0].filter(i => !weekly.includes(i.brand));
  const result = rec &&
    accPopular && [...rec[0], ...range.map(i => accPopular[i])];
  return rec[0].length >= 5 ? rec[0] : result;
};
