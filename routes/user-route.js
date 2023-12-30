const express = require("express");
const router = express.Router();

router.get('/user', (req, res) => {
    res.send('hello world')
  })

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당

