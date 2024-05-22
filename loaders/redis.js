const { createClient } = require('redis');
const { db } = require('./db');
const { getBrandData } = require('../models/brand-queries');
const { getNoticesList, getFAQ } = require('../models/support-queries');

const connectAndQuery = async (...queryAndParam) => {
  const conn = await db();
  const getConn = await conn.getConnection();
  const result = await getConn.query(...queryAndParam);
  getConn.release();
  return result;
};

const redisPort = process.env.REDIS_PORT;
const redisUrl = process.env.REDIS_URL;

const publisherClient = createClient({
  url: `${redisUrl}${redisPort}`
});

const subscriberClient = createClient({
  url: `${redisUrl}${redisPort}`
});

const initializeRedisClients = async () => {
  if (!publisherClient.isOpen) {
    await publisherClient.connect();
    console.log('Publisher Redis client connected');
  }
  if (!subscriberClient.isOpen) {
    await subscriberClient.connect();
    console.log('Subscriber Redis client connected');
  }
};

const cacheBrandData = async () => {
  const cacheKey = 'brandData';
  const result = await connectAndQuery(getBrandData);
  if (publisherClient.isOpen) {
    await publisherClient.set(cacheKey, JSON.stringify(result[0]));
  }
  if (!publisherClient.isOpen) {
    await publisherClient.connect();
    await publisherClient.set(cacheKey, JSON.stringify(result[0]));
  }
};

const cacheNoticesList = async () => {
  const cacheKey = 'noticesList';
  const result = await connectAndQuery(getNoticesList);
  if (publisherClient.isOpen) {
    await publisherClient.set(cacheKey, JSON.stringify(result[0]));
  }
  if (!publisherClient.isOpen) {
    await publisherClient.connect();
    await publisherClient.set(cacheKey, JSON.stringify(result[0]));
  }
};

const cacheFAQData = async () => {
  const cacheKey = 'FAQData';
  const result = await connectAndQuery(getFAQ);
  if (publisherClient.isOpen) {
    await publisherClient.set(cacheKey, JSON.stringify(result[0]));
  }
  if (!publisherClient.isOpen) {
    await publisherClient.connect();
    await publisherClient.set(cacheKey, JSON.stringify(result[0]));
  }
};

module.exports = {
  publisherClient,
  subscriberClient,
  initializeRedisClients,
  cacheBrandData,
  cacheNoticesList,
  cacheFAQData
};
