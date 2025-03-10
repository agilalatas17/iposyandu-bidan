import setAuthorizationHeaders from './setAuthorizationHeaders';

export default () => {
  const accessToken = localStorage.getItem('iposyandubidan:access_token');

  if (accessToken) {
    const { token } = JSON.parse(accessToken);
    return setAuthorizationHeaders(token);
  }
};
