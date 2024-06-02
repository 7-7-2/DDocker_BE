const userService = require('../services/user-service');

const signIn = async (req, res) => {
  const { social } = await req.params;
  const { unlink } = await req.params;
  if (social === 'kakao') {
    url = await userService.kakaoSignIn(unlink, res);
  }
  if (social === 'google') {
    url = await userService.googleSignIn(unlink, res);
  }

  return res.status(200).json({ url, social });
};

const socialRedirect = async (req, res) => {
  const { code } = await req.query;
  const { social } = await req.params;
  const userInfo = await userService.getSocialAuth(social, code);
  const result = await userService.ddockerSignIn(userInfo, res);
  return result && result;
};

const setInitForm = async (req, res) => {
  const body = await req.body;
  const initReq = [
    body.useremail,
    body.social,
    body.userId,
    body.nickname,
    body.brand,
    body.aboutMe,
    body.profileUrl
  ];
  const result = await userService.setUserInit(initReq);
  const accessToken = await userService.getAccessToken(body.userId);
  return (
    result &&
    accessToken &&
    res.status(201).json({ success: 'ok', data: accessToken })
  );
};

const unlinkSocialAuth = async (req, res) => {
  const { social } = await req.params;
  const { token } = await req.params;
  const result = await userService.unlinkSocialAuth(social, token);
  return result && res.status(200).json('success : ok');
};

const deleteAccount = async (req, res) => {
  const { social } = await req.params;
  const { code } = await req.query;
  const socialToken = await userService.getSocialToken(social, code);
  const unlickSocial = await userService.unlinkSocialAuth(social, socialToken);
  const result = unlickSocial && (await userService.deleteAccount(req.userId));
  return result && res.status(200).json('success : ok');
};

const editProfile = async (req, res) => {
  const result = await userService.patchUserProfile([req.body, req.userId]);
  return result && res.status(200).json('success : ok');
};

const getUserInfo = async (req, res) => {
  const userId = req.userId || req.params.userId;
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
  const pages = Number(req.params.pages);
  const result = await userService.getUserPosts([userId, pages]);
  const { posts, allCount } = result;
  return (
    result &&
    res.status(200).json({
      success: 'ok',
      data: result,
      next:
        (posts && posts.length) < 18
          ? null
          : allCount === pages + (posts && posts.length)
            ? null
            : pages + 1
    })
  );
};

const getUserFollowsCount = async (req, res) => {
  const userId = req.params.userId;
  const result = await userService.getUserFollowsCount(userId);
  return result && res.status(200).json({ success: 'ok', data: result });
};

module.exports = {
  signIn,
  socialRedirect,
  setInitForm,
  unlinkSocialAuth,
  deleteAccount,
  getUserInfo,
  editProfile,
  checkUserNickname,
  getUserPosts,
  getUserFollowsCount
};
