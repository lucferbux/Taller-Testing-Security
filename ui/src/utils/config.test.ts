/* eslint-disable @typescript-eslint/no-var-requires */

beforeEach(() => {
  jest.resetModules();
  delete process.env.REACT_APP_BASE_URI;
  delete process.env.REACT_APP_API_URI;
});


test("config with api base url from environment variable", () => {
  // Given
  const anyBaseUrl = "any-base-url";
  process.env.REACT_APP_BASE_URI = anyBaseUrl;

  // When
  const { API_BASE_URI } = require("./config.ts");

  // Then
  expect(API_BASE_URI).toBe(anyBaseUrl);
});

test("config with api base url with another path", () => {
  // Given
  const anyBaseUrl = "any-base-url";
  process.env.REACT_APP_BASE_URI = anyBaseUrl;

  // And
  const extraPath = "/extraPath";
  process.env.REACT_APP_API_URI = extraPath;

  // When
  const { API_BASE_URI } = require("./config.ts");

  // Then
  expect(API_BASE_URI).toBe(anyBaseUrl + extraPath);
});

test("config with no api base url", () => {
  // When
  const { API_BASE_URI } = require("./config.ts");

  // Then
  expect(API_BASE_URI).toBeUndefined();
});
