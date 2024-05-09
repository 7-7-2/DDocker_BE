const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');
const reportController = require('../controllers/report-controller');

router.post(
  '/report/:postId',
  AuthMiddleware.verifyToken,
  errorHandler(reportController.postReport)
);

module.exports = router;
