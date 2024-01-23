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

const CREDENTIALS = process.env.CREDENTIALS === 'true';

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
  ORIGIN
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
  ORIGIN
};
