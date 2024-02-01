const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/follow-controller');
const errorHandler = require('../middlewares/errorHandler');

router
  .route('/follow/:userId')
  .post(
    errorHandler(FollowController.followUser)
    // #swagger.tags = ['FOLLOW']
    // #swagger.summary = '인증된 사용자가 param:userId 유저 팔로우'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .delete(
    errorHandler(FollowController.unfollowUser)
    // #swagger.tags = ['FOLLOW']
    // #swagger.summary = '인증된 사용자가 param:userId 유저 언팔로우'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .get(
    errorHandler(FollowController.checkFollowing)
    // #swagger.tags = ['FOLLOW']
    // #swagger.summary = '프로필 진입시 팔로잉 중인 유저인지(:userId) 확인'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  );

router.get(
  '/follow/:userId/following',
  errorHandler(FollowController.getFollowingList)
  // #swagger.tags = ['FOLLOW']
  // #swagger.summary = '인증된 사용자가 param:userId의 팔로잉 목록 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router.get(
  '/follow/:userId/follower',
  errorHandler(FollowController.getFollowerList)
  // #swagger.tags = ['FOLLOW']
  // #swagger.summary = '인증된 사용자가 param:userId의 팔로우 목록 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당
