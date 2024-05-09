const reportDB = require('../models/report-db');

// 게시물 신고
const postReport = async req => {
  const result = await reportDB.postReport(req);
  return result ? result : await Promise.reject('Failed to DDocker Sign up');
};

module.exports = { postReport };
