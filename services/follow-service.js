const followDB = require('../models/follow-db');

module.exports = {
  followUser: async (req, res) => {
    const result = await followDB.followUser(req);
    return result ? result : Promise.reject('Failed to follow user');
  },
  unfollowUser: async (req, res) => {
    const result = await followDB.unfollowUser(req);
    return result ? result : Promise.reject('Failed to unfollow user');
  },
  getFollowingList: async (req, res) => {
    const result = await followDB.getFollowingList(req);
    return result ? result : Promise.reject('Failed to get following list');
  },
  getFollowerList: async (req, res) => {
    const result = await followDB.getFollowerList(req);
    return result ? result : Promise.reject('Failed to get follower list');
  },
  checkFollowing: async (req, res) => {
    const result = await followDB.checkFollowing(req);
    return result
      ? result
      : result === 0
        ? false
        : Promise.reject('Failed to check if following or not');
  }
};
