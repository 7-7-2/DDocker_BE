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
  const initReq = [body.nickName, body.gender, body.brand, Number(body.id)];
  await userService.setUserInit(initReq).catch(err => {
    console.log('Error during set InitForm:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  const accessToken = await userService.getAccessToken(userId);
  return res.status(200).json({ accessToken: accessToken });
};

const getUserInfo = async (req, res) => {
  const id = req.params.userId;
  const userInfo = await userService.getUserInfo(id);
  return res.status(200).json(userInfo);
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
  getUserInfo
};
