const PostService = require('../services/post-service');
// 1. 포스트 조회
exports.getPostDetail = async (req, res) => {
  const { postReq } = req.params.postId;
  const postRes = await PostService.getPostDetail(postReq).catch(err => {
    console.log(err);
    res.status(500).json({
      message: err
    });
  });
  return res.status(200).json({ postRes });
};
