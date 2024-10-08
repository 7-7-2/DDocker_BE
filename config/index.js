// app.js 시작시 env 처리
const { config } = require('dotenv');

if (process.env.NODE_ENV === undefined) {
  config({
    path: `.env.local`
  });
} else {
  config({
    path: `.env.${process.env.NODE_ENV}`
  });
}

const CREDENTIALS = (process.env.CREDENTIALS = true);
const ORIGIN = (process.env.ORIGIN = [
  'https://ddocker.kro.kr',
  'https://www.ddocker.kro.kr'
]);

const {
  NODE_ENV,
  NODE_MESSAGE,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_SCHEMA,
  ACCESS_TOKEN_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_TOKEN_URL,
  GOOGLE_REDIRECT_URI,
  GOOGLE_UNLINK_URI,
  GOOGLE_USERINFO_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  KAKAO_UNLINK_URI,
  KAKAO_TOKEN_URL,
  KAKAO_USERINFO_URL
} = process.env;

module.exports = {
  CREDENTIALS,
  NODE_ENV,
  NODE_MESSAGE,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_SCHEMA,
  ORIGIN,
  ACCESS_TOKEN_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_TOKEN_URL,
  GOOGLE_REDIRECT_URI,
  GOOGLE_UNLINK_URI,
  GOOGLE_USERINFO_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  KAKAO_UNLINK_URI,
  KAKAO_TOKEN_URL,
  KAKAO_USERINFO_URL
};
