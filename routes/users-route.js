const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/user-controller');

// Oauth
router.get('/users/signIn', userController.signIn);
router.get('/users/google/redirect', userController.googleRedirect);
router.get('/users/kakao/redirect', userController.kakaoRedirect);

router.get('/users/check', userController.checkUserNickname);

router.post(
  '/users',
  AuthMiddleware.verifyToken,
  userController.setInitForm
  // #swagger.tags = ['USERS']
  // #swagger.summary = '회원가입 유저 등록'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router
  .route('/users/userInfo')
  .patch(
    AuthMiddleware.verifyToken,
    userController.editProfile
    // #swagger.tags = ['USERS']
    // #swagger.summary = 'EDIT 페이지 프로필 정보 수정'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .get(
    AuthMiddleware.verifyToken,
    userController.getUserInfo
    // #swagger.tags = ['USERS']
    // #swagger.summary = '프로필 페이지 상단 정보 (유저이름, 프로필사진, 카페인 정보)'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  );

router.get('/users/:userId/follow', (req, res) => {
  res.json('프로필 페이지용 팔로우/팔로잉 카운트');
  // #swagger.tags = ['USERS']
  // #swagger.summary = '프로필 페이지용 팔로우/팔로잉 카운트'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
});

router.get(
  '/users/:userId/posts',
  AuthMiddleware.verifyToken,
  userController.getUserPosts
  // #swagger.tags = ['USERS']
  // #swagger.summary = '유저 작성 게시물 그리드'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당
