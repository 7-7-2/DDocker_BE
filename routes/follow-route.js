const express = require('express');
const router = express.Router();

router
  .route('/follow/:userId')
  .post((req, res) => {
    res.json('follow');
    // #swagger.tags = ['FOLLOW']
    // #swagger.summary = '인증된 사용자가 param:userId 유저 팔로우'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  })
  .delete((req, res) => {
    res.json('unfollow');
    // #swagger.tags = ['FOLLOW']
    // #swagger.summary = '인증된 사용자가 param:userId 유저 언팔로우'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  });

router.get('/follow/:userID/following', (req, res) => {
  res.json('following');
  // #swagger.tags = ['FOLLOW']
  // #swagger.summary = '인증된 사용자가 param:userId의 팔로잉 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
});

router.get('/follow/:userID/follower', (req, res) => {
  res.json('follower');
  // #swagger.tags = ['FOLLOW']
  // #swagger.summary = '인증된 사용자가 param:userId의 팔로잉 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
});

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당
