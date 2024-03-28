const express = require('express');
const router = express.Router();
const LikesController = require('../controllers/likes-controller');
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');

router
  .route('/likes/:postId')
  .post(
    AuthMiddleware.verifyToken,
    errorHandler(LikesController.likePost)
  )
  .delete(
    AuthMiddleware.verifyToken,
    errorHandler(LikesController.undoLikePost)
  )
  .get(
    AuthMiddleware.verifyToken,
    errorHandler(LikesController.getMyLikeOnPost)
  );

module.exports = router;
