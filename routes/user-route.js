const express = require("express");
const router = express.Router();

router.get('/user', (req, res) => {
  // #swagger.tags = ['USER']
  // #swagger.responses[500] = { description: '서버 에러' }
  // #swagger.responses[200] = { description: '성공' }
  // #swagger.responses[404] = { description: '요청경로 재확인' }

  res.send('hello world')
  })

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당

