const BASE_URL="http://localhost:8080/api/v1";
const CREATOR_LOGIN_URL = BASE_URL + '/creator/login';
const CREATOR_SIGNUP_URL = BASE_URL + '/creator/signup';
const BRAND_BASE_URL = BASE_URL + '/brand';
const BRAND_LOGIN_URL = BASE_URL + '/brand/login';
const BRAND_SIGNUP_URL = BASE_URL + '/brand/signup';
const BRAND_AUTH_URL = BASE_URL + '/brand/auth-silent';
const GET_PRODUCTS_URL = BASE_URL + '/product';
const GET_PRODUCTS_AUTH_URL = BASE_URL + '/product/auth';
const GET_BRAND_PRODUCTS_LIST_URL = BASE_URL + '/product/list';

const IP_LOOKUP_URL = "https://ipinfo.io/json?token=8772fbb5573aa9";

export {
  BASE_URL,
  BRAND_AUTH_URL,
  BRAND_LOGIN_URL,
  CREATOR_LOGIN_URL,
  BRAND_SIGNUP_URL,
  CREATOR_SIGNUP_URL,
  IP_LOOKUP_URL,
  GET_PRODUCTS_URL,
  GET_BRAND_PRODUCTS_LIST_URL,
  BRAND_BASE_URL,
  GET_PRODUCTS_AUTH_URL
}