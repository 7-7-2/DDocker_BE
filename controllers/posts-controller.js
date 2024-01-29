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
// 2. 포스트 등록(+JWT 인증)
exports.registerPost = async (req, res) => {
  const postReq = req.body;
  const postRes = await PostService.registerPost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 3. 포스트 삭제(+JWT 인증)
exports.deletePost = async (req, res) => {
  const postReq = req.params.postId;
  const postRes = await PostService.deletePost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 4. 포스트 수정(+JWT 인증)
exports.updatePost = async (req, res) => {
  const postReq = [req.params.postId, req.body];
  const postRes = await PostService.updatePost(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 5. 댓글 작성(+JWT 인증)
exports.writeComment = async (req, res) => {
  const postReq = [req.params.postId, req.body];
  const postRes = await PostService.writeComment(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
