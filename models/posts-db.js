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
  const { user_id, brand, menu, post_title, size, shot, caffeine, photo } =
    await postReq;
  const params = [
    user_id,
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
  const [postId, comment] = await postReq;
  const params = [comment.user_id, postId, comment.content];
  const result = await connectAndQuery(PostQueries.writeComment, params);
  const data = result[0];
  return data && data;
};

exports.deleteComment = async postReq => {
  const [postId, commentId] = await postReq;
  const params = [postId, commentId];
  const result = await connectAndQuery(PostQueries.deleteComment, params);
  const data = result[0];
  return data && data;
};

exports.replyComment = async postReq => {
  const [commentId, reply] = await postReq;
  const params = [reply.user_id, commentId, reply.content];
  const result = await connectAndQuery(PostQueries.replyComment, params);
  const data = result[0];
  return data && data;
};

exports.deleteReply = async postReq => {
  await postReq;
  const params = [postReq];
  const result = await connectAndQuery(PostQueries.deleteReply, params);
  const data = result[0];
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
