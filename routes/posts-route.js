const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts-controller');
const errorHandler = require('../middlewares/errorHandler');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get(
  '/posts',
  AuthMiddleware.verifyToken,
  errorHandler(postController.getFollowingPosts)
  //        !!!!! GET FOLLOWERS POSTS !!!!
  // #swagger.tags = ['POSTS']
  // #swagger.summary = '로그인한 유저가 팔로잉 중인 유저의 게시물들 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router
  .route('/posts/:postId')
  .get(
    errorHandler(postController.getPostDetail)
    // #swagger.tags = ['POSTS']
    // #swagger.summary = '게시글 상세 정보 조회'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .patch(
    AuthMiddleware.verifyToken,
    errorHandler(postController.updatePost)
    // #swagger.tags = ['POSTS']
    // #swagger.summary = '게시글 수정'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .delete(
    AuthMiddleware.verifyToken,
    errorHandler(postController.deletePost)
    // #swagger.tags = ['POSTS']
    // #swagger.summary = '게시글 삭제'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  );

router.post(
  '/posts/register',
  AuthMiddleware.verifyToken,
  errorHandler(postController.registerPost)
  // #swagger.tags = ['POSTS']
  // #swagger.summary = '게시글 작성'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router
  .route('/posts/:postId/comments')
  .post(
    AuthMiddleware.verifyToken,
    errorHandler(postController.writeComment)
    // #swagger.tags = ['POSTS']
    // #swagger.summary = '댓글 작성'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .get(
    errorHandler(postController.getComments)
    // #swagger.tags = ['POSTS']
    // #swagger.summary = '게시글 댓글 목록 조회'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  );

router.delete(
  '/posts/:postId/comments/:commentId',
  AuthMiddleware.verifyToken,
  errorHandler(postController.deleteComment)
  // #swagger.tags = ['POSTS']
  // #swagger.summary = '댓글 삭제'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router
  .route('/posts/:commentId/reply')
  .post(
    AuthMiddleware.verifyToken,
    errorHandler(postController.replyComment)
    // #swagger.tags = ['POSTS']
    // #swagger.summary = '답글 작성'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  )
  .get(
    errorHandler(postController.getReply)
    // #swagger.tags = ['POSTS']
    // #swagger.summary = '댓글에서 더보기 클릭시 답글 조회'
    // #swagger.responses[200] = { description: 'OK' }
    // #swagger.responses[400] = { description: 'Bad Request' }
    // #swagger.responses[500] = { description: 'Internal Server Error' }
  );

router.delete(
  '/posts/reply/:replyId',
  AuthMiddleware.verifyToken,
  errorHandler(postController.deleteReply)
  // #swagger.tags = ['POSTS']
  // #swagger.summary = '답글 삭제'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
);

router.get('/posts/popular', (req, res) => {
  res.json('인기 브랜드 순위 조회');
  // #swagger.tags = ['POSTS']
  // #swagger.summary = '인기 브랜드 순위 조회'
  // #swagger.responses[200] = { description: 'OK' }
  // #swagger.responses[400] = { description: 'Bad Request' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
});

module.exports = router;

// routes => 서버에 요청이 들어올 때 URI의 path에 따라 필요한 controller로 이어주는 역할만 담당
