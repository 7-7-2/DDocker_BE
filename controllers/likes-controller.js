const LikesService = require('../services/likes-service');

exports.likePost = async (req, res) => {
  const postReq = [req.userId, req.params.postId];
  const postRes = await LikesService.likePost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};

exports.undoLikePost = async (req, res) => {
  // req.userId;
  const postReq = [req.userId, req.params.postId];
  const postRes = await LikesService.undoLikePost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
