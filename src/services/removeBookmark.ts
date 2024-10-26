// import AuthenticatedFetch from './authenticatedFetch';
// import { BRAND_BASE_URL } from '../utils/environments';

// const removeBookmark = async (brandId: number, bookmarkId: number, signal: any) => {
//   const url = `${BRAND_BASE_URL}/${brandId}/bookmark/${bookmarkId}`
//   const method = 'DELETE';
//   const customHeaders = null;
//   const body = null;
//   const response = await AuthenticatedFetch(url, method, body, customHeaders, signal);
//   if (!response.ok) {
//     throw new Error(`${response.status}`);
//   }
//   return true;
// };

// export default removeBookmark;