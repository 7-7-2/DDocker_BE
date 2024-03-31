const userDB = require('../models/user-db');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

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
  // res.redirect(url);
  return url;
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
  return userInfo
    ? userInfo
    : await Promise.reject('Failed to get user profile');
};

// KAKAO OAUTH
const kakaoSignIn = async res => {
  let url = 'https://kauth.kakao.com/oauth/authorize';
  url += `?client_id=${KAKAO_CLIENT_ID}`;
  url += `&redirect_uri=${KAKAO_REDIRECT_URI}`;
  url += '&response_type=code';
  return url;
};

const getKakaoAuth = async code => {
  console.log(code);
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: KAKAO_REDIRECT_URI,
    code
  });

  const req = await fetch(KAKAO_TOKEN_URL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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
  return userInfo
    ? userInfo
    : await Promise.reject('Failed to get user profile');
};

const setUserOauth = async (req, res) => {
  const email = req[1];
  const social = req[2];
  const id = nanoid();
  await req.push(id);

  // 가입된 정보가 있을때
  const userId = await userDB.getUserAuthInfo([email, social]);
  const result = await getAccessToken(userId);

  // 가입된 정보가 없을때
  if (!userId) {
    await userDB.setUserOauth(req);
    const userId = await userDB.getUserAuthInfo([email, social]);
    const result = await getAccessToken(userId);

    return result
      ? await res.status(201).json({ success: 'Created', accessToken: result })
      : await Promise.reject('Failed to social login');
  }

  return result
    ? await res.status(200).json({ success: 'OK', accessToken: result })
    : await Promise.reject('Failed to social login');
};

// DDOCKER SIGN UP
const setUserInit = async req => {
  const result = await userDB.setUserInit(req);
  return result ? result : await Promise.reject('Failed to DDocker Sign up');
};

// USER INFO
const getUserInfo = async userId => {
  console.log(userId);
  const result = await userDB.getUserInfo(userId);
  console.log('🚀 ~ getUserInfo ~ result:', result);

  return result
    ? result
    : result === null
      ? true
      : await Promise.reject('Failed to get UserInfo');
};

// DDOCKER ACCESS_TOKEN
const getAccessToken = async userId => {
  const user = { userId: userId };
  const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET);
  return accessToken
    ? `Bearer ${accessToken}`
    : await Promise.reject('Failed to get DDocker accessToken');
};

// EDIT USER PROFILE
const patchUserProfile = async req => {
  const result = await userDB.patchUserInfo(req);
  return result ? result : await Promise.reject('Failed to Edit User Profile');
};

// CHECK USER NICKNAME
const checkUserNickname = async req => {
  const result = await userDB.checkUserNickname(req);
  return result
    ? 1
    : result === 0
      ? true
      : await Promise.reject('Failed to Check Nickname');
};

//  GET USER POSTS
const getUserPosts = async req => {
  const result = await userDB.getUserPosts(req);
  return result
    ? await result
    : await Promise.reject('Failed to get User Posts');
};

//  GET USER FOLLOWES COUNT
const getUserFollowsCount = async userId => {
  const following = await userDB.getUserFollowingCount(userId);
  const followed = await userDB.getUserFollowedCount(userId);
  const result = { following: following, followed: followed };
  return result
    ? result
    : await Promise.reject('Failed to get User Follows Count');
};

module.exports = {
  setUserInit,
  setUserOauth,
  googleSignIn,
  getAccessToken,
  getUserInfo,
  getGoogleAuth,
  kakaoSignIn,
  getKakaoAuth,
  patchUserProfile,
  checkUserNickname,
  getUserPosts,
  getUserFollowsCount
};
