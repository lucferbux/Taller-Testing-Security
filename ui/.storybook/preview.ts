import type { Preview } from "@storybook/react";
import i18n from './i18next.js';
import '../src/main.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    i18n,
    locale: 'en',
    locales: {
      en: 'English',
      es: 'Spanish',   
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
