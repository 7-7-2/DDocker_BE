const expressLoader = require('./express');
const { initializePool } = require('./db');
const { initializeRedisClients, cacheBrandData } = require('./redis');

module.exports = async ({ expressApp }) => {
  await initializePool();
  console.log('DB_INIT_BY_LOADER');
  await initializeRedisClients();
  await cacheBrandData();
  console.log('REDIS_INIT_BY_LOADER');
  await expressLoader({ app: expressApp });
  console.log('EXPRESS_INIT_BY_LOADER');
};
