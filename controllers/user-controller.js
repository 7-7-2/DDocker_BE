const userService = require('../services/user-service');

const signIn = async (req, res) => {
  const { social } = req.query;
  if (social === 'google') await userService.googleSignIn(res);
  if (social === 'kakao') await userService.kakaoSignIn(res);
};

const googleRedirect = async (req, res) => {
  const { code } = await req.query;
  try {
    const userInfo = await userService.getGoogleAuth(code);
    const userId = await userService.setUserOauth(userInfo);
    const resault = await userService.getAccessToken(userId);
    if (!resault) return res.status(201).json({ id: userId });
    return res.status(200).json({ accessToken: resault });
  } catch (error) {
    console.error('Error during authentication:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const kakaoRedirect = async (req, res) => {
  const { code } = await req.query;
  try {
    const userInfo = await userService.getKakaoAuth(code);
    const userId = await userService.setUserOauth(userInfo);
    const resault = await userService.getAccessToken(userId);
    if (!resault) return res.status(201).json({ id: userId });
    return res.status(200).json({ accessToken: resault });
  } catch (error) {
    console.error('Error during authentication:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const setInitForm = async (req, res) => {
  const body = await req.body;
  const userId = Number(body.id);
  const initReq = [body.nickName, body.gender, body.brand, userId];
  await userService.setUserInit(initReq);
  const accessToken = await userService.getAccessToken(userId);
  return accessToken && res.status(200).json({ accessToken: accessToken });
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
  const id = req.params.userId;
  try {
    const userInfo = await userService.getUserInfo(id);
    return userInfo && res.status(200).json({ success: ok, data: userInfo });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// middleware 적용
const test = async (req, res) => {
  // middleware에서 req.[name]으로 보낸 JWT payload
  await res.status(200).json(`${req.userId}, ${req.nickname}`);
};

module.exports = {
  test,
  signIn,
  kakaoRedirect,
  googleRedirect,
  setInitForm,
  getUserInfo,
  editProfile
};
