const postsDB = require('../models/posts-db');
const validatePostForm = require('../middlewares/validatePostForm');
const switchBrand = require('../middlewares/switchBrand');
const storageURL = require('../middlewares/generateStorageURL');

module.exports = {
  getPostDetail: async (req, res) => {
    const result = await postsDB.getPostDetail(req);
    const converted = { ...result, brand: switchBrand(result.brand) };
    return result ? converted : Promise.reject('Failed to get post detail');
  },
  registerPost: async (req, res) => {
    const result = (await validatePostForm(req))
      ? await postsDB.registerPost(req)
      : await Promise.reject('Invalid Post Register Request');
    return result;
  },
  deletePost: async (req, res) => {
    const result = await postsDB.deletePost(req);
    return result ? result : Promise.reject('Failed to delete post');
  },
  updatePost: async (req, res) => {
    const result = await postsDB.updatePost(req);
    return result ? result : Promise.reject('Failed to update post');
  },
  writeComment: async (req, res) => {
    const result = await postsDB.writeComment(req);
    return result ? result : Promise.reject('Failed to write comment');
  },
  deleteComment: async (req, res) => {
    const result = await postsDB.deleteComment(req);
    return result ? result : Promise.reject('Failed to delete comment');
  },
  replyComment: async (req, res) => {
    const result = await postsDB.replyComment(req);
    return result ? result : Promise.reject('Failed to reply comment');
  },
  deleteReply: async (req, res) => {
    const result = await postsDB.deleteReply(req);
    return result ? result : Promise.reject('Failed to delete reply');
  },
  getComments: async (req, res) => {
    const result = await postsDB.getComments(req);
    return result ? result : Promise.reject('Failed to get comments');
  },
  getReply: async (req, res) => {
    const result = await postsDB.getReply(req);
    return result ? result : Promise.reject('Failed to get reply');
  },
  getFollowingPosts: async (req, res) => {
    const result = await postsDB.getFollowingPosts(req);
    result && result.results.forEach(i => (i.brand = switchBrand(i.brand)));
    return result ? result : Promise.reject('Failed to get following posts');
  },
  getSocialCounts: async (req, res) => {
    const result = await postsDB.getSocialCounts(req);
    const frozen = Object.freeze(result[0]);
    const converted = {
      totalComments: Number(frozen.totalComments),
      totalLikes: Number(frozen.totalLikes)
    };
    return result ? converted : Promise.reject('Failed to get social counts');
  },
  getRanking: async (req, res) => {
    const result = await postsDB.getRanking(req);
    return result ? result : Promise.reject('Failed to get ranking');
  },
  getDailyPopular: async (req, res) => {
    const result = await postsDB.getDailyPopular(req);
    return result ? result : Promise.reject('Failed to get daily popular');
  },
  getR2UploadUrl: async (req, res) => {
    if (!req.params.userId === req.userId) return;
    if (!req.params.postId) {
      const { dir, userId } = req.params;
      const result = await storageURL.getPresignedUploadUrl(`${dir}/${userId}`);
      return result ? result : Promise.reject('Failed to get R2 upload url');
    }
    const { dir, userId, postId } = req.params;
    const result = await storageURL.getPresignedUploadUrl(
      `${dir}/${userId}/${postId}`
    );
    return result ? result : Promise.reject('Failed to get R2 upload url');
  },
  getR2DeleteUrl: async (req, res) => {
    if (!req.params.userId === req.userId) return;
    if (!req.params.postId) {
      const { dir, userId } = req.params;
      const result = await storageURL.getPresignedDeleteUrl(`${dir}/${userId}`);
      return result ? result : Promise.reject('Failed to get R2 delete url');
    }
    const { dir, userId, postId } = req.params;
    const result = await storageURL.getPresignedDeleteUrl(
      `${dir}/${userId}/${postId}`
    );
    return result ? result : Promise.reject('Failed to get R2 delete url');
  },
  getR2DeleteAllUrl: async (req, res) => {
    if (!req.params.userId === req.userId) return;
    const { dir, userId } = req.params;
    const result = await storageURL.deleteAllFolderItems(`${dir}/${userId}`);
    return result ? result : Promise.reject('Failed to get R2 delete url');
  }
};
