import AuthenticatedFetch from './authenticatedFetch';
import { BRAND_BASE_URL } from '../utils/environments';

const removeAdCheckout = async (brandId: number, adId: number, signal: any, authData: any) => {
  const url = `${BRAND_BASE_URL}/${brandId}/ad/${adId}/checkout`
  const method = 'DELETE';
  const customHeaders = null;
  const body = null;
  const response = await AuthenticatedFetch(url, method, body, customHeaders, signal, authData);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return true;
};

export default removeAdCheckout;