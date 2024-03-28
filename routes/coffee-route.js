const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');
const coffeeController = require('../controllers/coffee-controller');

router.get(
  '/coffee',
  AuthMiddleware.verifyToken,
  errorHandler(coffeeController.getCoffeeInfo)
);

router.get(
  '/coffee/caffeine',
  AuthMiddleware.verifyToken,
  errorHandler(coffeeController.getDaySum)
);

router.get(
  '/coffee/calendar',
  AuthMiddleware.verifyToken,
  errorHandler(coffeeController.getCalendar)
);

module.exports = router;

