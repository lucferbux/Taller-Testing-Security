import ApiClient, {
  GenericError,
  TokenResponse,
  Unauthorized,
} from "../api/api-client";

import {
  login,
  logout,
  isUserActive,
  getCurrentUser,
  removeUser,
  setLogoutIfExpiredHandler,
  WrongCredentialsException
} from "./auth";


import createApiClient from "../api/api-client-factory";
import { User } from "../model/user";
import { userKey } from "../constants/config";
jest.mock("../api/api-client-factory");

const mockedCreateApiClient = createApiClient as jest.Mock<ApiClient>;



const ANY_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTJiNGRmYjUxODlmMzVlZGExZjBhOSIsImVtYWlsIjoibHVjYXNmZXJuYW5kZXphcmFnb25AZ21haWwuY29tIiwiaWF0IjoxNjQ1NDM2MTQ4LCJleHAiOjE2NDU0MzYyMDh9.HmqhMQIHMbTvCM-Ay46xTJAkazz84Ft8198t8AtwsuM";
const ANY_EXPIRES_IN = 80;
const CURRENT_TIMESTAMP = 1645436150000;
const ANY_EMAIL = "lucasfernandezaragon@gmail.com";
const ANY_ID = "6212b4dfb5189f35eda1f0a9";
const ANY_USERNAME = "lucasfernandezaragon@gmail.com";
const ANY_PASSWORD = "any-password";
const USER_TOKEN = userKey;
const ANY_USER_TOKEN: UserToken = {
  id: ANY_ID,
  email: ANY_EMAIL,
  notBeforeTimestampInMillis: CURRENT_TIMESTAMP,
  expirationTimestampInMillis: ANY_EXPIRES_IN * 1000 + CURRENT_TIMESTAMP,
};

const ANY_USER: User = {
  active: true,
  id: ANY_ID,
  email: ANY_EMAIL,
}

const ANY_TOKEN_RESPONSE: TokenResponse = {
  token: ANY_ACCESS_TOKEN,
};

beforeEach(() => {
  jest.useFakeTimers();
  Date.now = jest.fn(() => CURRENT_TIMESTAMP);
});

afterEach(async () => {
  jest.clearAllTimers();
  jest.resetAllMocks();
  localStorage.removeItem(USER_TOKEN);
  await logout();
});

test("login happy case", async () => {
  // Given

  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockResolvedValue(ANY_TOKEN_RESPONSE);
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  await login(ANY_USERNAME, ANY_PASSWORD);

  // Then
  expect(isUserActive()).toBeTruthy();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(getCurrentUser()).toEqual(ANY_USER);
});

test("login - success and then logs out when token expires", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockResolvedValue(ANY_TOKEN_RESPONSE);
  apiClient.logout = jest.fn().mockResolvedValue("");
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  await login(ANY_USERNAME, ANY_PASSWORD);

  // Then
  expect(isUserActive()).toBeTruthy();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(getCurrentUser()).toEqual(ANY_USER);

  // When (set the token to expire)
  jest.advanceTimersByTime(ANY_EXPIRES_IN * 1000);

  setLogoutIfExpiredHandler();

  // Then
  expect(isUserActive()).toBeFalsy();
});

test("login failed - unauthorized", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockRejectedValue(new Unauthorized());
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  try {
    await login(ANY_USERNAME, ANY_PASSWORD);
  } catch (e) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(e).toBeInstanceOf(WrongCredentialsException);
  }

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeout).toHaveBeenCalledTimes(0);
});

test("login failed - generic error", async () => {
  // Given
  const apiClient = <ApiClient>{};
  apiClient.token = jest.fn().mockRejectedValue(new GenericError(500, "err"));
  mockedCreateApiClient.mockReturnValue(apiClient);

  // When
  try {
    await login(ANY_USERNAME, ANY_PASSWORD);
  } catch (e) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(e).toBeInstanceOf(Error);
  }

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeout).toHaveBeenCalledTimes(0);
});

test("logout happy case", async () => {
  // Given
  setUserToken();

  // When
  await logout();

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(clearTimeout).toHaveBeenCalledTimes(1);
});


test("init when token exists but it is expired", () => {
  // Given
  setUserToken();
  dateMakesTokenExpired();

  // Then
  expect(isUserActive()).toBeFalsy();
  expect(setTimeout).toHaveBeenCalledTimes(0);
});

test("getAccessToken without token set", () => {
  // When
  const actual = getCurrentUser();

  // Then
  expect(actual).toBeUndefined();
});

test("isTokenActive on non existing token", () => {
  // When
  const actual = isUserActive();

  // Then
  expect(actual).toBeFalsy();
});

describe.each([
  ["current", true, CURRENT_TIMESTAMP],
  [
    "edge before expiration",
    true,
    CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000 - 1,
  ],
  ["date before", false, CURRENT_TIMESTAMP - 1],
  ["exact expiration", false, CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000],
])("isTokenActive", (desc, expected, testTimestamp) => {
  test(`is ${expected} on ${desc}`, () => {
    // Given
    Date.now = jest.fn(() => testTimestamp);

    // And
    setUserToken();

    // When
    const actual = isUserActive();

    // Then
    expect(actual).toBe(expected);
  });
});

interface UserToken {
  id: string;
  email: string;
  notBeforeTimestampInMillis: number;
  expirationTimestampInMillis: number;
}

function setUserToken() {
  const userToken: UserToken = {
    id: ANY_ID,
    email: ANY_EMAIL,
    notBeforeTimestampInMillis: CURRENT_TIMESTAMP,
    expirationTimestampInMillis: ANY_EXPIRES_IN * 1000 + CURRENT_TIMESTAMP,
  };
  localStorage.setItem(USER_TOKEN, JSON.stringify(userToken));
}

function dateMakesTokenExpired() {
  Date.now = jest.fn(() => CURRENT_TIMESTAMP + ANY_EXPIRES_IN * 1000);
}
