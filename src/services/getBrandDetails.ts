import AuthenticatedFetch from './authenticatedFetch';
import { BRAND_BASE_URL } from '../utils/environments';

const getBrandDetails = async (brandId: number, signal: any, authData: any) => {
  const url = `${BRAND_BASE_URL}/${brandId}/details`
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

export default getBrandDetails;