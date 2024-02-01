const userService = require('../services/user-service');

const signIn = async (req, res) => {
  const { social } = req.query;
  try {
    if (social === 'google') await userService.googleSignIn(res);
    if (social === 'kakao') await userService.kakaoSignIn(res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const googleRedirect = async (req, res) => {
  const { code } = await req.query;
  try {
    const userInfo = await userService.getGoogleAuth(code);
    const accessToken = await userService.setUserOauth(userInfo);
    return res.status(200).json({ success: 'ok', accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const kakaoRedirect = async (req, res) => {
  const { code } = await req.query;
  try {
    const userInfo = await userService.getKakaoAuth(code);
    const accessToken = await userService.setUserOauth(userInfo);
    return res.status(200).json({ success: 'ok', accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const setInitForm = async (req, res) => {
  try {
    const body = await req.body;
    const initReq = [body.nickName, body.gender, body.brand, req.userId];
    await userService.setUserInit(initReq);
    return res.status(200).json('success: ok');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editProfile = async (req, res) => {
  try {
    await userService.patchUserProfile([req.body, req.userId]);
    return res.status(200).json('success : ok');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userInfo = await userService.getUserInfo(userId);
    return userInfo && res.status(200).json({ success: 'ok', data: userInfo });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkUserNickname = async (req, res) => {
  const { nickname } = req.query;
  try {
    const result = await userService.checkUserNickname(nickname);
    return res.status(200).json({ success: 'ok', data: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await userService.getUserPosts(userId);
    return res.status(200).json({ success: 'ok', data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserFollowsCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await userService.getUserFollowsCount(userId);
    return res.status(200).json({ success: 'ok', data: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
