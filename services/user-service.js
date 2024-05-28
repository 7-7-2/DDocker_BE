const userDB = require('../models/user-db');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_TOKEN_URL,
  GOOGLE_REDIRECT_URI,
  GOOGLE_UNLINK_URI,
  GOOGLE_USERINFO_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  KAKAO_UNLINK_URI,
  KAKAO_TOKEN_URL,
  KAKAO_USERINFO_URL,
  ACCESS_TOKEN_SECRET
} = require('../config/index');

// OAUTH 소셜로그인 code 요청
const googleSignIn = async (req, res) => {
  const redirectURI = !req ? GOOGLE_REDIRECT_URI : GOOGLE_UNLINK_URI;
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${redirectURI}`;
  url += '&response_type=code';
  url += '&scope=email';
  return url ? url : await Promise.reject('Failed to get user google Oauth');
};

const kakaoSignIn = async (req, res) => {
  const redirectURI = !req ? KAKAO_REDIRECT_URI : KAKAO_UNLINK_URI;
  let url = 'https://kauth.kakao.com/oauth/authorize';
  url += `?client_id=${KAKAO_CLIENT_ID}`;
  url += `&redirect_uri=${redirectURI}`;
  url += '&response_type=code';
  return url ? url : await Promise.reject('Failed to get user kakao Oauth');
};

// OAUTH 유저정보(이메일) 가져오기
const getSocialAuth = async (social, code) => {
  const data =
    social === 'google'
      ? new URLSearchParams({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      : new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_REDIRECT_URI,
          code
        });

  const tokenURL = social === 'google' ? GOOGLE_TOKEN_URL : KAKAO_TOKEN_URL;
  const userInfoURL =
    social === 'google' ? GOOGLE_USERINFO_URL : KAKAO_USERINFO_URL;

  const req = await fetch(tokenURL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });

  if (!req.ok) {
    throw new Error('failed to get social accessToken');
  }

  const tokenData = await req.json();
  const userInfoReq = await fetch(userInfoURL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!userInfoReq.ok) {
    throw new Error(
      `Failed to fetch user information: ${userInfoReq}.status} - ${await userInfoReq.text()}`
    );
  }

  const res = await userInfoReq.json();
  const email = social === 'google' ? res.email : res.kakao_account.email;
  const userInfo = [email, social];

  return userInfo
    ? { userInfo: userInfo, socialToken: tokenData.access_token }
    : await Promise.reject('Failed to get user profile');
};

const getSocialToken = async (social, code) => {
  const data =
    social === 'google'
      ? new URLSearchParams({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE_UNLINK_URI,
          grant_type: 'authorization_code'
        })
      : new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_UNLINK_URI,
          code
        });

  const tokenURL = social === 'google' ? GOOGLE_TOKEN_URL : KAKAO_TOKEN_URL;

  const req = await fetch(tokenURL, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });

  if (!req.ok) {
    throw new Error('failed to get social accessToken');
  }

  const tokenData = await req.json();
  return tokenData
    ? tokenData.access_token
    : await Promise.reject('Failed to get social accessToken');
};

// social auth  ddocker 삭제
const unlinkSocialAuth = async (social, token) => {
  const unlinkURL =
    social === 'google'
      ? `https://accounts.google.com/o/oauth2/revoke?token=${token}`
      : `https://kapi.kakao.com/v1/user/unlink`;

  const headers =
    social === 'google'
      ? {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      : {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`
        };

  const result = await fetch(unlinkURL, {
    method: 'POST',
    headers: headers
  });

  return result ? result.status : await Promise.reject('Failed to Unlink');
};

// ddocker 로그인|회원가입
const ddockerSignIn = async (req, res) => {
  const { userInfo, socialToken } = req;

  // 회원|비회원 판별
  const userId = await userDB.getUserAuthInfo(userInfo);
  const result = await getAccessToken(userId);

  return !userId
    ? await res.status(201).json({
        success: 'Created',
        socialEmail: userInfo[0],
        socialToken: socialToken
      })
    : result
      ? await res.status(200).json({
          success: 'OK',
          accessToken: result,
          socialToken: socialToken
        })
      : await Promise.reject('Failed to social login');
};

// DDOCKER 회원가입
const setUserInit = async req => {
  const result = await userDB.setUserInit(req);
  return result ? result : await Promise.reject('Failed to DDocker Sign up');
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
  getSocialAuth,
  ddockerSignIn,
  unlinkSocialAuth,
  googleSignIn,
  kakaoSignIn,
  getAccessToken,
  getSocialToken,
  deleteAccount,
  getUserInfo,
  patchUserProfile,
  checkUserNickname,
  getUserPosts,
  getUserFollowsCount
};
