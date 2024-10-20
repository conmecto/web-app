import { CREATOR_SIGNUP_URL } from '../utils/environments';

type locationInfo = {
  city?: string,
  region?: string,
  country?: string,
  postal?: string
} 
  
type SignupFormData = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  locationInfo?: locationInfo
}

const signupCreator = async (formData: SignupFormData, signal: any) => {
  const response = await fetch(CREATOR_SIGNUP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: formData.firstName,
      lastname: formData.lastName,
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

export default signupCreator;