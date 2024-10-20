import { IP_LOOKUP_URL } from '../utils/environments';

const countryLookup = async (signal: any) => {
  const response = await fetch(IP_LOOKUP_URL);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export default countryLookup;