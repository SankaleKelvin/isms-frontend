import router from '../router/index';
import api from '../services/api';

class TokenService {
  setToken(token) {
    localStorage.setItem("authToken", token);
  }
  
  setUser(user) {
    // Store as JSON string since localStorage only supports strings
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  setAbilities(abilities) {
    // Store as JSON string
    localStorage.setItem("abilities", JSON.stringify(abilities));
  }
  
  getToken() {
    return localStorage.getItem("authToken");
  }
  
  getUser() {
    const userStr = localStorage.getItem("user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error("Error parsing user data:", e);
      return null;
    }
  }
  
  getAbilities() {
    const abilitiesStr = localStorage.getItem("abilities");
    try {
      return abilitiesStr ? JSON.parse(abilitiesStr) : {};
    } catch (e) {
      console.error("Error parsing abilities data:", e);
      return {};
    }
  }
  
  removeToken() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("abilities");
  }
  
  isAuthenticated() {
    return !!this.getToken();
  }
  
  // Check if user has a specific ability
  hasAbility(ability) {
    const abilities = this.getAbilities();
    return abilities[ability] === true;
  }
  
}

const myTokenInstance = new TokenService();
export default myTokenInstance;