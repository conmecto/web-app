let accessToken = "";

const setAccessToken = (token: string) => {
    accessToken = token;
}

const getAccessToken = () => {
    return accessToken;
}

export { setAccessToken, getAccessToken }