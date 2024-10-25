import { GET_BRAND_PRODUCTS_LIST_URL } from '../utils/environments';

const getBrandProductsList = async (brandName: string, signal: any) => {
  let queryString = `?brand_name=${brandName}`;
  const response = await fetch(GET_BRAND_PRODUCTS_LIST_URL + queryString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default getBrandProductsList;