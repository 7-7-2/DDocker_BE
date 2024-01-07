const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

module.exports = async ({ app }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use(require('cors')());
  app.use(require('morgan')('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerFile));
  // __dirname: path 모듈 내장 변수, 현재 디렉토리 경로 (__filename: 현재 파일 경로)
  const routesPath = path.join(__dirname, '../routes');
  //디렉토리 내 파일들을 동기적으로 읽어들여 middleware적용
  //e.g. fetch('http://localhost:3306/api/*route*')
  //각 rotue파일 내부에 app.post
  fs.readdirSync(routesPath).forEach(file => {
    //routes디렉토리 하위 모듈들을 경로에 맞게 가져오기(require)
    const route = require(path.join(routesPath, file));
    //*mount routes*, each route => const router = express.Router() + get, post / path
    app.use('/api', route);
  });

  return app;
};

// morgan => 클라이언트 측과 서버 측 사이에서 HTTP 요청과 응답 사이에 발생하는 정보들을 기록해주는 미들웨어
// body parser =>  JSON 형태의 요청(request) body를 파싱(parse)하기 위해 사용
// querystring 은 node.js 의 내장 모듈, false 설정시 이를 사용하여 해석
