const userDB = require('../models/user-db');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_TOKEN_URL,
  GOOGLE_REDIRECT_URI,
  GOOGLE_USERINFO_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  KAKAO_TOKEN_URL,
  KAKAO_USERINFO_URL,
  ACCESS_TOKEN_SECRET
} = require('../config/index');

// GOOGLE OAUTH
const googleSignIn = async res => {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`;
  url += '&response_type=code';
  url += '&scope=email profile';
  res.redirect(url);
};

const getGoogleAuth = async code => {
  const data = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code'
  });

  const req = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!req.ok) {
    throw new Error('failed to get token');
  }

  const tokenData = await req.json();

  const userInfoReq = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  if (!userInfoReq.ok) {
    throw new Error(
      `Failed to fetch user information: ${userInfoReq}.status} - ${await userInfoReq.text()}`
    );
  }

  const res = await userInfoReq.json();
  const userInfo = [res.picture, res.email, 'google'];

  return userInfo;
};

// KAKAO OAUTH
const kakaoSignIn = async res => {
  let url = 'https://kauth.kakao.com/oauth/authorize';
  url += `?client_id=${KAKAO_CLIENT_ID}`;
  url += `&redirect_uri=${KAKAO_REDIRECT_URI}`;
  url += '&response_type=code';
  res.redirect(url);
};

const getKakaoAuth = async code => {
  const data = new URLSearchParams({
    code,
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: KAKAO_REDIRECT_URI,
    grant_type: 'authorization_code'
  });

  const req = await fetch(KAKAO_TOKEN_URL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!req.ok) {
    throw new Error('failed to get token');
  }

  const tokenData = await req.json();

  const userInfoReq = await fetch(KAKAO_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!userInfoReq.ok) {
    throw new Error(
      `Failed to fetch user information: ${
        userInfoReq.status
      } - ${await userInfoReq.text()}`
    );
  }

  const res = await userInfoReq.json();
  const userInfo = [
    res.kakao_account.profile.profile_image_url,
    res.kakao_account.email,
    'kakao'
  ];
  return userInfo;
};

const setUserOauth = async req => {
  const email = req[1];
  const social = req[2];

  // 가입된 정보가 있을때
  const userId = await userDB.getUserAuthInfo([email, social]);

  // 가입된 정보가 없을때
  if (!userId) {
    await userDB.setUserOauth(req);
    const res = await userDB.getUserAuthInfo([email, social]);
    return res;
  }

  return userId;
};

// DDOCKER SIGN UP
const setUserInit = async req => {
  await userDB.setUserInit(req);
  await userDB.getAcessToken(userInfo);
};

// USER INFO
const getUserInfo = async id => {
  const result = await userDB.getUserInfo(id);
  return result;
};

// DDOCKER ACCESS_TOKEN
const getAccessToken = async id => {
  const signInInfo = await getUserInfo(id);
  console.log(signInInfo);
  if (!signInInfo) {
    return null;
  }
  const user = {
    nickname: signInInfo.nickname,
    userId: signInInfo.id
  };

  return jwt.sign(user, ACCESS_TOKEN_SECRET);
};

module.exports = {
  setUserInit,
  setUserOauth,
  googleSignIn,
  getAccessToken,
  getUserInfo,
  getGoogleAuth,
  kakaoSignIn,
  getKakaoAuth
};
