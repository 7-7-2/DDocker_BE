const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/user-controller');

router.get(
  '/users/signIn',
  userController.signIn
  // #swagger.tags = ['USERS']
  // #swagger.summary = '소셜 로그인'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);
router.get(
  '/users/google/redirect',
  userController.googleRedirect
  // #swagger.tags = ['USERS']
  // #swagger.summary = '구글 로그인 인가/유저 정보 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);
router.get(
  '/users/kakao/redirect',
  userController.kakaoRedirect
  // #swagger.tags = ['USERS']
  // #swagger.summary = '카카오 로그인 인가/유저 정보 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router.get(
  '/users/check',
  userController.checkUserNickname
  // #swagger.tags = ['USERS']
  // #swagger.summary = '닉네임 중복 검사'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

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

router.patch(
  '/users/userInfo',
  AuthMiddleware.verifyToken,
  userController.editProfile
  // #swagger.tags = ['USERS']
  // #swagger.summary = 'EDIT 페이지 프로필 정보 수정'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' })
);

router.get(
  '/users/:userId/userInfo',
  AuthMiddleware.verifyToken,
  userController.getUserInfo
  // #swagger.tags = ['USERS']
  // #swagger.summary = '프로필 페이지 상단 정보 (유저이름, 프로필사진, 카페인 정보)'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router.get(
  '/users/:userId/follow',
  userController.getUserFollowsCount
  // #swagger.tags = ['USERS']
  // #swagger.summary = '프로필 페이지용 팔로우/팔로잉 카운트'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

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
