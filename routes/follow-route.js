const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/follow-controller');
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');

router
  .route('/follow/:userId')
  .post(AuthMiddleware.verifyToken, errorHandler(FollowController.followUser))
  .delete(
    AuthMiddleware.verifyToken,
    errorHandler(FollowController.unfollowUser)
  )
  .get(
    AuthMiddleware.verifyToken,
    errorHandler(FollowController.checkFollowing)
  );

router.get(
  '/follow/:userId/following/:pageNum',
  errorHandler(FollowController.getFollowingList)
);

router.get(
  '/follow/:userId/follower/:pageNum',
  errorHandler(FollowController.getFollowerList)
);

router.get(
  '/follow/:userId/username',
  errorHandler(FollowController.getUsernameById)
);

module.exports = router;
