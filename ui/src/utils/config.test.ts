/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, expect, vi, describe, it } from 'vitest';
import { getDefaultBaseUrl } from './config';

describe('config testing', () => {
  let baseUrl = '';

  beforeEach(() => {
    vi.resetModules();
    delete import.meta.env.VITE_BASE_URI;
    delete import.meta.env.VITE_API_URI;
  });

  it('config with api base url from environment variable', () => {
    // Given
    const anyBaseUrl = 'any-base-url';
    import.meta.env.VITE_BASE_URI = anyBaseUrl;

    // And
    baseUrl = getDefaultBaseUrl(import.meta.env.VITE_BASE_URI, import.meta.env.VITE_API_URI);

    // Then
    expect(baseUrl).toBe(anyBaseUrl);
  });

  it('config with api base url with another path', () => {
    // Given
    const anyBaseUrl = 'any-base-url';
    import.meta.env.VITE_BASE_URI = anyBaseUrl;

    // And
    const extraPath = '/extraPath';
    import.meta.env.VITE_API_URI = extraPath;

    baseUrl = getDefaultBaseUrl(import.meta.env.VITE_BASE_URI, import.meta.env.VITE_API_URI);

    // Then
    expect(baseUrl).toBe(anyBaseUrl + extraPath);
  });

  it('config with no api base url', () => {
    baseUrl = getDefaultBaseUrl(import.meta.env.VITE_BASE_URI, import.meta.env.VITE_API_URI);

    // Then
    expect(baseUrl).toBe('');
  });
});

export {};
