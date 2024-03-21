const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const brandController = require('../controllers/brand-controller');

router.get(
  '/brand/weekly/popular/:brand',
  errorHandler(brandController.getWeeklyPopularBrandMenu)
);
router.get(
  '/brand/recent/:brand',
  errorHandler(brandController.getBrandRecentPosts)
);
router.get(
  '/brand/popular/:brand',
  errorHandler(brandController.getBrandPopularPosts)
);
router.get('/brand', errorHandler(brandController.getBrand));

module.exports = router;
