const LikesService = require('../services/likes-service');
const { storePostNotification } = require('../middlewares/redisQueue');

// 1. 게시글 좋아요
exports.likePost = async (req, res) => {
  const postReq = [req.userId, req.params.postId];
  const postRes = await LikesService.likePost(postReq);
  const self = req.userId === postRes[0];
  postRes &&
    !self &&
    (await storePostNotification(
      req.userId,
      postRes[0],
      postRes[1],
      req.params.postId,
      'like'
    ));
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 2. 게시글 좋아요 취소
exports.undoLikePost = async (req, res) => {
  const postReq = [req.userId, req.params.postId];
  const postRes = await LikesService.undoLikePost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 3. 인증된 사용자가 게시글의 본인 좋아요 확인(게시글 진입시)
exports.getMyLikeOnPost = async (req, res) => {
  const postReq = [req.userId, req.params.postId];
  const postRes = await LikesService.getMyLikeOnPost(postReq);
  return res
    .status(200)
    .json({ success: postRes !== undefined ? postRes : null });
};
