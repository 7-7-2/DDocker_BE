const { retrieveNotifications } = require('../middlewares/redisQueue');
const { createClient } = require('redis');

const notificationClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

exports.retrieveNotifications = async (req, res) => {
  const userId = req.params.userId;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  req.on('close', () => {
    console.log(`SSE connection closed for user ${userId}`);
    notificationClient.unsubscribe(`notifications:${userId}`);
  });

  const notifications = await retrieveNotifications(userId);
  (await notifications) &&
    (await notifications.forEach(notification => {
      res.write(`data: ${notification}\n\n`);
    }));
  !notifications && res.write(`data: empty`);

  const run = async () => {
    await notificationClient.connect();
  };
  run();

  await notificationClient.subscribe(
    `notifications:${userId}`,
    (message, channel) => {
      res.write(`data: ${message}\n\n`);
    }
  );
};
