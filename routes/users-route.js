const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const errorHandler = require('../middlewares/errorHandler');
const userController = require('../controllers/user-controller');

// 소셜 로그인
router.get(
  '/users/signIn/:social/:unlink?',
  errorHandler(userController.signIn)
);

// DDOCKER 로그인 & 회원가입 판별
router.get(
  '/users/:social/redirect',
  errorHandler(userController.socialRedirect)
);

// 소셜 & DDOCKER 연동 해제
router.get(
  '/users/:social/unlink/:token',
  errorHandler(userController.unlinkSocialAuth)
);

// DDOCKER 회원탛퇴
router.delete(
  '/users/:social',
  AuthMiddleware.verifyToken,
  errorHandler(userController.deleteAccount)
);

// 닉네임 중복체크
router.get('/users/check', errorHandler(userController.checkUserNickname));

// DDOCKER 회원가입
router.post('/users', errorHandler(userController.setInitForm));

// DDOCKER 개인 프로필 조회 & 편집
router
  .route('/users/userInfo')
  .get(AuthMiddleware.verifyToken, errorHandler(userController.getUserInfo))
  .patch(AuthMiddleware.verifyToken, errorHandler(userController.editProfile));

// DDOCKER 타 사용자 정보 조회
router.get('/users/:userId/userInfo', errorHandler(userController.getUserInfo));

// 사용자 별 PROFILE PAGE 데이터 조회
router.get(
  '/users/:userId/follow',
  errorHandler(userController.getUserFollowsCount)
);
router.get(
  '/users/:userId/posts/:pages',
  errorHandler(userController.getUserPosts)
);

module.exports = router;
