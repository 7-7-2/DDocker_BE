const PostService = require('../services/post-service');
const { storePostNotification } = require('../middlewares/redisQueue');

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
  const postReq = [req.userId, req.body];
  const postRes = await PostService.registerPost(postReq);
  return (
    postRes &&
    res
      .status(200)
      .json({ success: postRes !== undefined ? 'ok' : null, data: postRes })
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
  const postReq = [req.userId, req.params.postId, req.body.content];
  const postRes = await PostService.writeComment(postReq);
  const self = req.userId === postRes[0];

  postRes &&
    !self &&
    (await storePostNotification(
      req.userId,
      postRes[0],
      postRes[1],
      req.params.postId,
      'comment'
    ));
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 6. 댓글 삭제(+JWT 인증)
exports.deleteComment = async (req, res) => {
  const postReq = [req.userId, req.params.postId, req.params.commentId];
  const postRes = await PostService.deleteComment(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 7. 답글 작성(+JWT 인증)
exports.replyComment = async (req, res) => {
  const postReq = [req.userId, req.params.commentId, req.body.content];
  const postRes = await PostService.replyComment(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 8. 답글 삭제(+JWT 인증)
exports.deleteReply = async (req, res) => {
  const postReq = [req.userId, req.params.replyId];
  const postRes = await PostService.deleteReply(postReq);
  return (
    postRes &&
    res.status(200).json({ success: postRes !== undefined ? 'ok' : null })
  );
};
// 9. 포스트 진입시 댓글목록 조회
exports.getComments = async (req, res) => {
  const postReq = req.params.postId;
  const postRes = await PostService.getComments(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 10. 댓글 하단 더보기 클릭시 답글목록 조회
exports.getReply = async (req, res) => {
  const postReq = req.params.commentId;
  const postRes = await PostService.getReply(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 11. 로그인한 유저가 팔로잉 중인 유저의 게시물들 조회
exports.getFollowingPosts = async (req, res) => {
  const postReq = [req.userId, req.params.pageNum];
  const postRes = await PostService.getFollowingPosts(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 12. 게시글 상세 내부 좋아요 및 댓글 개수 확인
exports.getSocialCounts = async (req, res) => {
  const postReq = req.params.postId;
  const postRes = await PostService.getSocialCounts(postReq);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
// 13. 메인 페이지 브랜드 순위 조회
exports.getRanking = async (req, res) => {
  const result = await PostService.getRanking(req);
  const date = new Date().getDate();
  const postRes = { [Number(date)]: result };
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
//14. 피드 상단 인기 게시글 조회
exports.getDailyPopular = async (req, res) => {
  const postRes = await PostService.getDailyPopular(req);
  return (
    postRes &&
    res.status(200).json({ data: postRes !== undefined ? postRes : null })
  );
};
