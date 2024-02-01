const query = require('./query-fns');

const queries = {
  followUser: query.buildInsert('follows', [
    'following_user_id',
    'followed_user_id'
  ]),

  unfollowUser: query.buildDelete('follows', [
    'following_user_id',
    'followed_user_id'
  ]),

  getFollowingList: query.buildGetFollowList('following'),
  getFollowerList: query.buildGetFollowList('follower'),
  checkFollowing: `SELECT 
  following_user_id, followed_user_id
  FROM follows
  WHERE following_user_id = ? AND followed_user_id = ?`
};
module.exports = queries;
