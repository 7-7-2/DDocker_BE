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

// GOOGLE OAUTH 소셜로그인
const googleSignIn = async res => {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`;
  url += '&response_type=code';
  url += '&scope=email profile';
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

// KAKAO OAUTH 소셜로그인
const kakaoSignIn = async res => {
  let url = 'https://kauth.kakao.com/oauth/authorize';
  url += `?client_id=${KAKAO_CLIENT_ID}`;
  url += `&redirect_uri=${KAKAO_REDIRECT_URI}`;
  url += '&response_type=code';
  return url;
};

const getKakaoAuth = async code => {
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

// 소셜로그인 연동
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
      ? await res
          .status(201)
          .json({ success: 'Created', accessToken: result, userId: userId })
      : await Promise.reject('Failed to social login');
  }

  return result
    ? await res
        .status(200)
        .json({ success: 'OK', accessToken: result, userId: userId })
    : await Promise.reject('Failed to social login');
};

// DDOCKER ACCESS_TOKEN 발급
const getAccessToken = async userId => {
  const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET);
  return accessToken
    ? `Bearer ${accessToken}`
    : await Promise.reject('Failed to get DDocker accessToken');
};

// DDOCKER 닉네임 중복검사
const checkUserNickname = async req => {
  const result = await userDB.checkUserNickname(req);
  return result
    ? 1
    : result === 0
      ? true
      : await Promise.reject('Failed to Check Nickname');
};

// DDOCKER 회원가입
const setUserInit = async req => {
  const result = await userDB.setUserInit(req);
  return result ? result : await Promise.reject('Failed to DDocker Sign up');
};

// DDOCKER 회원탈퇴
const deleteAccount = async req => {
  const result = await userDB.deleteAccount(req);
  return result ? result : await Promise.reject('Failed to DDocker Exit');
};

// DDOCKER 회원정보 조회
const getUserInfo = async userId => {
  const result = await userDB.getUserInfo(userId);
  return result
    ? result
    : result === null
      ? true
      : await Promise.reject('Failed to get UserInfo');
};

// DDOCKER 회원정보 수정
const patchUserProfile = async req => {
  const result = await userDB.patchUserInfo(req);
  return result ? result : await Promise.reject('Failed to Edit User Profile');
};

//  프로필 피드 게시물 조회
const getUserPosts = async req => {
  const result = await userDB.getUserPosts(req);
  return result
    ? await result
    : await Promise.reject('Failed to get User Posts');
};

//  프로필 피드 팔로워,팔로우 카운트 조회
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
  deleteAccount,
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
