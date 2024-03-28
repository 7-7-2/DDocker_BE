const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandler');
const SearchController = require('../controllers/search-controller');

router.get(
  '/search/:nickname',
  errorHandler(SearchController.getUserInfo)
);

module.exports = router;

