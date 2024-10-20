import { CREATOR_LOGIN_URL, BRAND_LOGIN_URL } from '../utils/environments';

type loginFormData = {
  email: string,
  password: string
}

const loginUser = async (formData: loginFormData, creator = false, signal: any) => {
  const response = await fetch(creator ? CREATOR_LOGIN_URL : BRAND_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    signal
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default loginUser;