const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const errorHandler = require('../middlewares/errorHandler');
const userController = require('../controllers/user-controller');

router.get(
  '/users/signIn',
  errorHandler(userController.signIn)
);
router.get(
  '/users/google/redirect',
  errorHandler(userController.googleRedirect)
);
router.get(
  '/users/kakao/redirect',
  errorHandler(userController.kakaoRedirect)
);

router.get(
  '/users/check',
  errorHandler(userController.checkUserNickname)
);

router.post(
  '/users',
  AuthMiddleware.verifyToken,
  errorHandler(userController.setInitForm)
);

router.patch(
  '/users/userInfo',
  AuthMiddleware.verifyToken,
  errorHandler(userController.editProfile)
);

router.get(
  '/users/:userId/userInfo',
  AuthMiddleware.verifyToken,
  errorHandler(userController.getUserInfo)
);

router.get(
  '/users/:userId/follow',
  errorHandler(userController.getUserFollowsCount)
);

router.get(
  '/users/:userId/posts/:pages',
  AuthMiddleware.verifyToken,
  errorHandler(userController.getUserPosts)
);

module.exports = router;
