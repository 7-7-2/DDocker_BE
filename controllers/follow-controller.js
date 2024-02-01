const FollowService = require('../services/follow-service');

// 1. 유저 팔로우
exports.followUser = async (req, res) => {
  // req.userId;
  const postReq = [req.body.following_user_id, req.params.userId];
  const postRes = FollowService.followUser(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 2. 유저 언팔로우
exports.unfollowUser = async (req, res) => {
  const postReq = [req.body.following_user_id, req.params.userId];
  const postRes = FollowService.unfollowUser(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 3. 유저의(:userId) 팔로잉 목록 확인
exports.getFollowingList = async (req, res) => {
  const postReq = req.params.userId;
  const postRes = FollowService.getFollowingList(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 4. 유저의(:userId) 팔로우 목록 확인
exports.getFollowerList = async (req, res) => {
  const postReq = req.params.userId;
  const postRes = FollowService.getFollowerList(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 5. 프로필 진입시 팔로잉 중인 유저인지 확인
exports.checkFollowing = async (req, res) => {
  const postReq = [req.body.following_user_id, req.params.userId];
  const postRes = FollowService.checkFollowing(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
