const PostService = require('../services/post-service');
// 1. 포스트 조회
exports.getPostDetail = async (req, res) => {
  const postReq = req.params.postId;
  const postRes = await PostService.getPostDetail(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 2. 포스트 등록
exports.registerPost = async (req, res) => {
  const postReq = req.body;
  const postRes = await PostService.registerPost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
