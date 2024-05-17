const { createClient } = require('redis');

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

module.exports = { publisherClient, subscriberClient, initializeRedisClients };
