const LikesService = require('../services/likes-service');
// 1. 게시글 좋아요
exports.likePost = async (req, res) => {
  const postReq = [req.userId, req.params.postId];
  const postRes = await LikesService.likePost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 2. 게시글 좋아요 취소
exports.undoLikePost = async (req, res) => {
  // req.userId;
  const postReq = [req.userId, req.params.postId];
  const postRes = await LikesService.undoLikePost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
