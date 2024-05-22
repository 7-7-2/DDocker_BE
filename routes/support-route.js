const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');
const reportController = require('../controllers/report-controller');
const supportController = require('../controllers/support-controller');

router.post(
  '/support/report/:postId',
  AuthMiddleware.verifyToken,
  errorHandler(reportController.postReport)
);

router.post(
  '/support/report/comment/:commentId',
  AuthMiddleware.verifyToken,
  errorHandler(reportController.commentReport)
);

router.get('/support/:type', errorHandler(supportController.getSupportList));
router.get(
  '/support/notice/:postId',
  errorHandler(supportController.getNoticeDetail)
);

module.exports = router;
