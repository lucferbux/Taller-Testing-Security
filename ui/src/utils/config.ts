export const getDefaultBaseUrl = (baseUrl?: string, apiBaseUrl?: string) => {
  if (baseUrl) {
    apiBaseUrl = apiBaseUrl || '';
    return baseUrl + apiBaseUrl;
  }
  return '';
};

export const API_BASE_URI = getDefaultBaseUrl(
  import.meta.env.VITE_BASE_URI,
  import.meta.env.VITE_API_URI
);
