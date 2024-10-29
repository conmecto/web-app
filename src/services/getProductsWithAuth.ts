import AuthenticatedFetch from './authenticatedFetch';
import { GET_PRODUCTS_AUTH_URL } from '../utils/environments';

const getProductsWithAuth = async (
  brandId: number, page: number, perPage: number, orientation: string, signal: any, 
  authData: any, brandName?: string, category?: string, productName?: string
) => {
  let queryString = `?brand_id=${brandId}&page=${page}&per_page=${perPage}&orientation=${orientation}`;
  if (brandName) {
    queryString += (`&brand_name=${brandName}`)
  }
  if (category) {
    queryString += (`&category=${category}`)
  }
  if (productName) {
    queryString += (`&product_name=${productName}`)
  }
  const url = GET_PRODUCTS_AUTH_URL + queryString;
  const method = 'GET';
  const customHeaders = null;
  const body = null;
  const response = await AuthenticatedFetch(url, method, body, customHeaders, signal, authData);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default getProductsWithAuth;