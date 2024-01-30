const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search-controller');

router.get(
  '/search/:nickname',
  SearchController.getUserInfo
  // #swagger.tags = ['SEARCH']
  // #swagger.summary = '유저 검색'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당
