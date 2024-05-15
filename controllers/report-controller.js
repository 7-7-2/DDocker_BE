const reportService = require('../services/report-service');

const postReport = async (req, res) => {
  const { postId } = req.params;
  const reportReq = [req.userId, postId, req.body.reason, req.body.other];
  const result = await reportService.postReport(reportReq, res);
  return result && res.status(200).json('success : ok');
};

const commentReport = async (req, res) => {
  const { commentId } = req.params;
  const reportReq = [
    req.userId,
    req.body.postId,
    req.body.reason,
    req.body.other,
    req.body.type,
    commentId
  ];
  console.log('🚀 ~ commentReport ~ reportReq:', reportReq);
  const result = await reportService.commentReport(reportReq, res);
  return result && res.status(200).json('success : ok');
};

module.exports = {
  postReport,
  commentReport
};
