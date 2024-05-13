//notification-route.js
const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification-controller');
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');

router
  .route('/notification/:userId')
  .get(
    AuthMiddleware.verifyToken,
    errorHandler(NotificationController.retrieveNotifications)
  );

module.exports = router;
