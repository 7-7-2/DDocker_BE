const reportDB = require('../models/report-db');

// 게시물 신고
const postReport = async req => {
  const result = await reportDB.postReport(req);
  return result ? result : await Promise.reject('Failed to report post');
};

const commentReport = async req => {
  const result = await reportDB.commentReport(req);
  return result ? result : await Promise.reject('Failed to report comment');
};

module.exports = { postReport, commentReport };
