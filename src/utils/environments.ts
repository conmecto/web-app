const BASE_URL="http://localhost:8080";
const AUTH_URL = BASE_URL + '/api/v1/user/auth-silent';
const BRAND_LOGIN_URL = BASE_URL + '/api/v1/brand/login';
const CREATOR_LOGIN_URL = BASE_URL + '/api/v1/creator/login';
const BRAND_SIGNUP_URL = BASE_URL + '/api/v1/brand/signup';
const CREATOR_SIGNUP_URL = BASE_URL + '/api/v1/creator/signup';

const IP_LOOKUP_URL = "https://ipinfo.io/json?token=8772fbb5573aa9";

export {
  BASE_URL,
  AUTH_URL,
  BRAND_LOGIN_URL,
  CREATOR_LOGIN_URL,
  BRAND_SIGNUP_URL,
  CREATOR_SIGNUP_URL,
  IP_LOOKUP_URL
}