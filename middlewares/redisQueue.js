const { createClient } = require('redis');

const redisPort = process.env.REDIS_PORT;

const redisClient = createClient(redisPort);

const run = async () => {
  await redisClient.connect();
};

run();

const curryClientStoreFollow =
  client => async (senderId, receiverId, nickname) => {
    const format = JSON.stringify({
      type: 'follow',
      senderId: senderId,
      nickname: nickname,
      time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    });
    const connection = await client.pubSubNumSub(`notifications:${receiverId}`);
    const isConnected =
      connection && (await connection[`notifications:${receiverId}`]);
    isConnected
      ? await client.publish(`notifications:${receiverId}`, format)
      : await client.lPush(`notifications:${receiverId}`, format);
  };

const curryClientStorePost =
  client => async (senderId, receiverId, nickname, postId, type) => {
    const format = JSON.stringify({
      type: type,
      postId: postId,
      senderId: senderId,
      nickname: nickname,
      time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    });
    const connection = await client.pubSubNumSub(`notifications:${receiverId}`);
    const isConnected =
      connection && (await connection[`notifications:${receiverId}`]);
    isConnected
      ? await client.publish(`notifications:${receiverId}`, format)
      : await client.lPush(`notifications:${receiverId}`, format);
  };

const curryClientRetrieve = client => async receiverId => {
  const notifications = await client.lRange(
    `notifications:${receiverId}`,
    0,
    -1
  );
  notifications
    ? await client.del(`notifications:${receiverId}`)
    : console.log('no notifications');
  return notifications;
};

const storeFollowNotification = curryClientStoreFollow(redisClient);
const storePostNotification = curryClientStorePost(redisClient);
const retrieveNotifications = curryClientRetrieve(redisClient);

module.exports = {
  storeFollowNotification,
  storePostNotification,
  retrieveNotifications
};
