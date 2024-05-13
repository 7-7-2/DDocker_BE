const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const errorHandler = require('../middlewares/errorHandler');
const userController = require('../controllers/user-controller');

router.get('/users/signIn', errorHandler(userController.signIn));

router.get(
  '/users/google/redirect',
  errorHandler(userController.googleRedirect)
);

router.get('/users/kakao/redirect', errorHandler(userController.kakaoRedirect));

router.get('/users/check', errorHandler(userController.checkUserNickname));

router
  .route('/users')
  .post(AuthMiddleware.verifyToken, errorHandler(userController.setInitForm))
  .delete(
    AuthMiddleware.verifyToken,
    errorHandler(userController.deleteAccount)
  );

router
  .route('/users/userInfo')
  .get(AuthMiddleware.verifyToken, errorHandler(userController.getUserInfo))
  .patch(AuthMiddleware.verifyToken, errorHandler(userController.editProfile));

router.get('/users/:userId/userInfo', errorHandler(userController.getUserInfo));

router.get(
  '/users/:userId/follow',
  errorHandler(userController.getUserFollowsCount)
);

router.get(
  '/users/:userId/posts/:pages',
  errorHandler(userController.getUserPosts)
);

router.get(
  '/users/profile/:userId',
  errorHandler(userController.getUserProfile)
);

module.exports = router;
