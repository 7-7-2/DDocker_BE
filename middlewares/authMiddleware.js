const { verify } = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET } = require('../config/index');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.status(401).send('Unauthorized');

  verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json('Forbidden');
    // JWT Payload를 middleware => 사용하고하고자 하는 컨트롤러로 req.[name] 전달
    req.userId = user.userId;
    next();
  });
};

module.exports = { verifyToken };
