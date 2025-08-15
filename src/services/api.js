import axios from 'axios';
import router from '../router/index';
import TokenService from './token.service';

const instance = axios.create({
  baseURL: 'http://144.126.224.235/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token to every request
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle expired/unauthorized access globally
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired access token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) {
        TokenService.removeTokens();
        router.push('/login');
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          'http://localhost:8085/api/auth/token/refresh',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + refreshToken,
            },
          }
        );

        const { access_token } = response.data;
        TokenService.setAccessToken(access_token);

        // Retry the original request with new token
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
        return instance(originalRequest);
      } catch (refreshError) {
        TokenService.removeTokens();
        router.push('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
