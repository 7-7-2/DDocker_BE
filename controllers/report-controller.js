const reportService = require('../services/report-service');

const postReport = async (req, res) => {
  const { postId } = req.params;
  console.log(req.body);
  const reportReq = [req.userId, postId, req.body.reason, req.body.other];
  result = await reportService.postReport(reportReq, res);
  return result && res.status(200).json('success : ok');
};

module.exports = {
  postReport
};
