const userService = require('../services/user-service');

// controllers => Request, Response를 담당

/** EXAMPLE CONTROLLER
 *  async (req, res, next) => {
    // 실질적인 라우터 레벨의 책임(req => )
    const userDTO = req.body;

    // 서비스 레이어로의 책임 이동
    // 데이터 레이어로의 접근과 비즈니스 로직 추상화
    const { user, company } = await UserService.Signup(userDTO);

    // ( => res)
    return res.json({ user, company });
 */

/**
 * !! REQ =>
 * req.params : 이름 붙은 라우트 파라미터
 * req.query : GET 방식으로 넘어오는 쿼리 스트링 파라미터
 * req.body : POST 방식으로 넘어오는 파라미터(body-parser)
 *
 * !! RES =>
 * res.status(code) : HTTP 응답 코드
 * res.send(body), res.send(status, body) : 클라이언트에 보내는 응답. 상태 코드는 옵션.
 *    기본 콘텐츠 타입은 text/html, text/plain을 보내려면 res.set(‘Content-Type’, ‘text/plain’)을 먼저 호출.
 *    JSON을 보낼거면 res.json
 * res.json(json), res.json(status, json) : 클라이언트로 JSON 값
 * res.sendFile(path, [options], [callback]) : path의 파일을 읽고 해당 내용을 클라이언트로 전송.
 */

const signIn = async (req, res) => {
  await userService.googleSignIn(res);
};

const kakaoSignIn = async (req, res) => {
  await userService.kakaoSignIn(res);
};

const signInRedirect = async (req, res) => {
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

module.exports = {
  signIn,
  kakaoSignIn,
  kakaoRedirect,
  signInRedirect,
  setInitForm,
  getUserInfo
};
