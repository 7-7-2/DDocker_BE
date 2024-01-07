// 1. 라우터 위치 명시
// 2. node swagger.js(execution) => sawagger-output.json생성
const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const doc = {
  info: {
    title: 'DDOCKER API SPEC',
    description: '똑똑한 커피생활'
  },
  host: 'localhost:4000/api',
  schemes: ['http'],
  tags: [
    {
      name: 'USERS',
      description: '유저 프로필 관련 API (api/users)'
    },
    {
      name: 'POSTS',
      description: '게시글 목록 및 상세 관련 API (api/posts)'
    },
    {
      name: 'COFFEE',
      description: '섭취 카페인 관련 API (api/coffee)'
    },
    {
      name: 'SEARCH',
      description: '검색 관련 API (api/search)'
    },
    {
      name: 'FOLLOW',
      description: '팔로우 및 팔로잉 관련 API (api/follow)'
    }
  ]
};

const outputFile = './swagger-output.json'; // swagger-autogen이 실행 후 생성될 파일 위치와 이름
const endpointsFiles = ['./routes/*.js']; // 읽어올 Router가 정의되어 있는 js파일들

swaggerAutogen(outputFile, endpointsFiles, doc);
