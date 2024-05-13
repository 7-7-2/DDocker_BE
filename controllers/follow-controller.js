const FollowService = require('../services/follow-service');
const { storeFollowNotification } = require('../middlewares/redisQueue');

// 1. 유저 팔로우
exports.followUser = async (req, res) => {
  const postReq = [req.userId, req.params.userId];
  const postRes = await FollowService.followUser(postReq);
  postRes &&
    (await storeFollowNotification(req.userId, req.params.userId, postRes));
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 2. 유저 언팔로우
exports.unfollowUser = async (req, res) => {
  const postReq = [req.userId, req.params.userId];
  const postRes = await FollowService.unfollowUser(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 3. 유저의(:userId) 팔로잉 목록 확인
exports.getFollowingList = async (req, res) => {
  const postReq = [req.params.userId, req.params.pageNum];
  const postRes = await FollowService.getFollowingList(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 4. 유저의(:userId) 팔로우 목록 확인
exports.getFollowerList = async (req, res) => {
  const postReq = [req.params.userId, req.params.pageNum];
  const postRes = await FollowService.getFollowerList(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 5. 프로필 진입시 팔로잉 중인 유저인지 확인
exports.checkFollowing = async (req, res) => {
  const postReq = [req.userId, req.params.userId];
  const postRes = await FollowService.checkFollowing(postReq);
  return res.status(200).json({ data: postRes !== undefined ? postRes : null });
};
// 6. 팔로우 페이지 헤더 유저이름
exports.getUsernameById = async (req, res) => {
  const postReq = req.params.userId;
  const postRes = await FollowService.getUsernameById(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
