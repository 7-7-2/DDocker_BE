const userService = require('../services/user-service');

const signIn = async (req, res) => {
  const { social } = req.query;

  if (social === 'google') {
    url = await userService.googleSignIn(res);
  }
  if (social === 'kakao') {
    url = await userService.kakaoSignIn(res);
  }
  return res.status(200).json({ url, social });
};

const googleRedirect = async (req, res) => {
  const { code } = await req.query;
  const userInfo = await userService.getGoogleAuth(code);
  const accessToken = await userService.setUserOauth(userInfo, res);
  return accessToken && accessToken;
};

const kakaoRedirect = async (req, res) => {
  const { code } = await req.query;
  const userInfo = await userService.getKakaoAuth(code);
  const accessToken = await userService.setUserOauth(userInfo, res);
  return accessToken && accessToken;
};

const setInitForm = async (req, res) => {
  const body = await req.body;
  const initReq = [body.nickName, body.gender, body.brand, req.userId];
  const result = await userService.setUserInit(initReq);
  return result && res.status(201).json('success: Created');
};

const editProfile = async (req, res) => {
  const result = await userService.patchUserProfile([req.body, req.userId]);
  return result && res.status(200).json('success : ok');
};

const getUserInfo = async (req, res) => {
  const userId = req.params.userId === 0 ? req.params.userId : req.userId;
  const userInfo = await userService.getUserInfo(userId);
  return userInfo && res.status(200).json({ success: 'ok', data: userInfo });
};

const checkUserNickname = async (req, res) => {
  const { nickname } = req.query;
  const result = await userService.checkUserNickname(nickname);
  return result && res.status(200).json({ success: 'ok', data: result });
};

const getUserPosts = async (req, res) => {
  const userId = req.params.userId;
  const pages = req.params.pages;
  const posts = await userService.getUserPosts([userId, pages]);
  return posts && res.status(200).json({ success: 'ok', data: posts });
};

const getUserFollowsCount = async (req, res) => {
  const userId = req.params.userId;
  const result = await userService.getUserFollowsCount(userId);
  return result && res.status(200).json({ success: 'ok', data: result });
};

module.exports = {
  signIn,
  kakaoRedirect,
  googleRedirect,
  setInitForm,
  getUserInfo,
  editProfile,
  checkUserNickname,
  getUserPosts,
  getUserFollowsCount
};
