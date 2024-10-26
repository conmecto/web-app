import { useAuth } from '../utils/authContext';

  
const AuthenticatedFetch = async (
  fetchUrl: string, method: string, body: any | null, customHeaders: any | null, signal: any, authData: any
) => {
  const { accessToken, setAccessToken, silentAuth, setUser  } = authData;
  const options: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${accessToken}`,
      ...(customHeaders ? customHeaders : {})
    },
    ...(body ? { body } : {}),
    signal
  }
  const response = await fetch(fetchUrl, options);
  if (response.status !== 401) {
    return response;
  }
  const result = await silentAuth(signal);
  if (result) {
    options.headers['authorization'] = `Bearer ${result.accessToken}`;
    setAccessToken(result.accessToken);
    setUser({
      id: result.userId,
      type: result.type
    });
  }
  const latestResponse = await fetch(fetchUrl, options);
  return latestResponse;
};

export default AuthenticatedFetch;