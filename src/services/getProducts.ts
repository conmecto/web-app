import { GET_PRODUCTS_URL } from '../utils/environments';

const getProducts = async (
  page: number, perPage: number, orientation: string, 
  signal: any, brandName?: string, category?: string,
  productName?: string
) => {
  let queryString = `?page=${page}&per_page=${perPage}&orientation=${orientation}`;
  if (brandName) {
    queryString += (`&brand_name=${brandName}`)
  }
  if (category) {
    queryString += (`&category=${category}`)
  }
  if (productName) {
    queryString += (`&product_name=${productName}`)
  }
  const response = await fetch(GET_PRODUCTS_URL + queryString, {
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

export default getProducts;