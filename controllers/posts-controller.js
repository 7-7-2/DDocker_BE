const PostService = require('../services/post-service');
// 1. 포스트 조회
exports.getPostDetail = async (req, res) => {
  const postReq = req.params.postId;
  const postRes = await PostService.getPostDetail(postReq).catch(err => {
    console.log('Controller:', err);
    res.status(500).json({
      error: err
    });
  });
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 2. 포스트 등록
exports.registerPost = async (req, res) => {
  const postRes = await PostService.registerPost(req).catch(err => {
    console.log('Controller:', err);
    res.status(500).json({
      error: err
    });
  });
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
