// 1. 라우터 위치 명시
// 2. node swagger.js(execution) => sawagger-output.json생성
const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const doc = {
    info: {
      title: "DDOCKER API SPEC",
      description: "똑똑한 커피생활",
    },
    host: "localhost:4000/api",
    schemes: ["http"],
    tags: [                   
    {
      name: 'USER',
      description: '유저 정보 관련 API'
    },
    {
        name: '',
        description: ''
    },
    {
        name: '',
        description: ''
    },
    {
        name: '',
        description: ''
    },
    {
        name: '',
        description: ''
    },
]
  };
  
  const outputFile = "./swagger-output.json";	// swagger-autogen이 실행 후 생성될 파일 위치와 이름
  const endpointsFiles = [
    "./routes/*.js"					
  ]; // 읽어올 Router가 정의되어 있는 js파일들
  
  swaggerAutogen(outputFile, endpointsFiles, doc);