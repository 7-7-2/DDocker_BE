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
    // #swagger.tags = ['LIKES']
    // #swagger.summary = '인증된 사용자가 param:postId 좋아요 표시'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .delete(
    AuthMiddleware.verifyToken,
    errorHandler(LikesController.undoLikePost)
    // #swagger.tags = ['LIKES']
    // #swagger.summary = '인증된 사용자가 param:postId 좋아요 표시 취소'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .get(
    AuthMiddleware.verifyToken,
    errorHandler(LikesController.getMyLikeOnPost)
    // #swagger.tags = ['LIKES']
    // #swagger.summary = '인증된 사용자가 param:postId 좋아요 표시 취소'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  );

module.exports = router;
