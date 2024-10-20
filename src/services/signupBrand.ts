import { BRAND_SIGNUP_URL } from '../utils/environments';

type locationInfo = {
  city?: string,
  region?: string,
  country?: string,
  postal?: string
} 
  
type SignupFormData = {
  brandName: string,
  repName: string,
  email: string,
  password: string,
  confirmPassword: string,
  locationInfo?: locationInfo
}

const signupBrand = async (formData: SignupFormData, signal: any) => {
  const response = await fetch(BRAND_SIGNUP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.brandName,
      user_name: formData.repName,
      email: formData.email,
      password: formData.password,
      city: formData.locationInfo?.city || '',
      region: formData.locationInfo?.region || '',
      postal: formData.locationInfo?.postal || '',
      country: formData.locationInfo?.country || '',
    }),
    signal
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default signupBrand;