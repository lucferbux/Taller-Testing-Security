import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyle';
// import Footer from "./footer";
import { themes } from '../../styles/ColorStyles';
import Header from './header';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { t } = useTranslation();

  const { user, logout } = useAuth();

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="theme-color"
          content={themes.light.primary}
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={themes.dark.primary}
          media="(prefers-color-scheme: dark)"
        />
      </Helmet>
      <GlobalStyle />
      <Header user={user} logout={logout} />
      <main>{props.children}</main>
      {/* <Footer/> */}
    </>
  );
};

export default Layout;
