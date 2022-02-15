import {i18n} from './i18next.js';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    es: 'Spanish',   
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}