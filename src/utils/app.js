import cookie from "cookie_js";

const adminToken = "admin_token";
const usernameKey = "username";

export function getToken() {
  return cookie.get(adminToken);
}

export function setToken(token) {
  return cookie.set(adminToken, token);
}

export function setUseName(value) {
  return cookie.set(usernameKey, value);
}

export function removeToken() {
  return cookie.remove(adminToken);
}

export function getUserName() {
  return cookie.get(usernameKey);
}

export function removeUserName() {
  return cookie.remove(usernameKey);
}