const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts-controller');
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get(
  '/posts/popular/daily',
  errorHandler(postController.getDailyPopular)
);

router.get('/posts/popular', errorHandler(postController.getRanking));

router.get(
  '/posts/following/:pageNum',
  AuthMiddleware.verifyToken,
  errorHandler(postController.getFollowingPosts)
);

router
  .route('/posts/:postId')
  .get(errorHandler(postController.getPostDetail))
  .patch(AuthMiddleware.verifyToken, errorHandler(postController.updatePost))
  .delete(AuthMiddleware.verifyToken, errorHandler(postController.deletePost));

router.post(
  '/posts/register',
  AuthMiddleware.verifyToken,
  errorHandler(postController.registerPost)
);

router
  .route('/posts/:postId/comments')
  .post(AuthMiddleware.verifyToken, errorHandler(postController.writeComment))
  .get(errorHandler(postController.getComments));

router.delete(
  '/posts/:postId/comments/:commentId',
  AuthMiddleware.verifyToken,
  errorHandler(postController.deleteComment)
);

router
  .route('/posts/:commentId/reply')
  .post(AuthMiddleware.verifyToken, errorHandler(postController.replyComment))
  .get(errorHandler(postController.getReply));

router.delete(
  '/posts/reply/:replyId',
  AuthMiddleware.verifyToken,
  errorHandler(postController.deleteReply)
);

router.get(
  '/posts/:postId/counts',
  errorHandler(postController.getSocialCounts)
);

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당
