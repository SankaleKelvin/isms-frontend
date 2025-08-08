
import { jwtDecode } from 'jwt-decode';
import api from './api';

class TokenService {
  setAccessToken(token) {
    localStorage.setItem('access_token', token);

    const user = this.decodeUser(token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('email', JSON.stringify(user.email));
    }
  }

  setRefreshToken(token) {
    localStorage.setItem('refresh_token', token);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  removeTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch (err) {
      return false;
    }
  }

  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    try {
      const response = await api.post('api/auth/refresh-token', { refresh_token: refreshToken });
      const { access_token } = response.data;
      if (access_token) {
        this.setAccessToken(access_token);
        return access_token;
      }
      throw new Error('Invalid refresh response');
    } catch (err) {
      this.removeTokens();
      throw err;
    }
  }

  getUser() {
    const cached = localStorage.getItem('user');
    return cached ? JSON.parse(cached) : null;
  }

  decodeUser(token) {
    try {
      const decoded = jwtDecode(token);
      return {
        username: decoded.sub,
        roles: decoded.roles || [],
        exp: decoded.exp,
      };
    } catch (e) {
      return null;
    }
  }

  hasRole(role) {
    const user = this.getUser();
    return user?.roles?.includes(role);
  }
}

export default new TokenService();
