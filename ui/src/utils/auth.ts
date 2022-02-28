import jwt_decode from "jwt-decode";
import { Unauthorized } from "../api/api-client";
import createApiClient from "../api/api-client-factory";
import { userKey } from "../constants/config";
import { User } from "../model/user";

interface UserToken {
  id: string;
  email: string;
  notBeforeTimestampInMillis: number;
  expirationTimestampInMillis: number;
}

interface JWTPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

class WrongCredentialsException extends Error {}

let logoutIfExpiredHandlerId: NodeJS.Timeout;

// TODO: 4) Adapt frontend to do the following:
// 1. Remove jwt local storage
// 2. Use a new User Local Storage with expiration time of JWT and User attributes
// 3. Call backend to logout if expired

function setLogoutIfExpiredHandler() {
  if (!isUserActive()) {
    return;
  }
  const token = getUserStorage();
  if (!token) {
    return;
  }

  logoutIfExpiredHandlerId = setTimeout(
    () => logout(),
    token.expirationTimestampInMillis - Date.now()
  );
}

function setUserToken(accessToken: string) {
  const tokenPayload = getPayload(accessToken);
  const token: UserToken = {
    id: tokenPayload.id,
    email: tokenPayload.email,
    notBeforeTimestampInMillis: tokenPayload.iat * 1000,
    expirationTimestampInMillis: tokenPayload.exp * 1000,
  };
  localStorage.setItem(userKey, JSON.stringify(token));
}

async function login(username: string, password: string) {
  const api = createApiClient();
  try {
    const result = await api.token(username, password);
    setUserToken(result.token);
    setLogoutIfExpiredHandler();
  } catch (apiError) {
    if (apiError instanceof Unauthorized) {
      throw new WrongCredentialsException();
    } else {
      throw new Error();
    }
  }
}

async function logout() {
  try {
    removeUser();
    clearTimeout(logoutIfExpiredHandlerId);
    const api = createApiClient();
    await api.logout();
  } catch (error) {
    console.log(error);
    console.log("Error while logging out");
  }
}

function getPayload(token: string): JWTPayload {
  return jwt_decode(token);
}

function removeUser() {
  localStorage.removeItem(userKey);
}

function getUserStorage(): UserToken | null {
  let user: UserToken;
  const userJson = localStorage.getItem(userKey);
  if (userJson) {
    user = JSON.parse(userJson);
    return user;
  }
  return null;
}

function getCurrentUser(): User | undefined {
  const user = getUserStorage();
  if (user) {
    if (!isUserActive()) {
      logout();
      return undefined;
    }
    return {
      id: user.id,
      active: true,
      email: user.email,
    };
  } else {
    return undefined;
  }
}

function isUserActive(): boolean {
  const user = getUserStorage();
  const currentTimestamp = Date.now();

  return !!(
    user &&
    user.expirationTimestampInMillis - currentTimestamp > 0 &&
    user.notBeforeTimestampInMillis <= currentTimestamp
  );
}

export {
  WrongCredentialsException,
  login,
  logout,
  isUserActive,
  getCurrentUser,
  removeUser,
  setUserToken,
  setLogoutIfExpiredHandler,
};
