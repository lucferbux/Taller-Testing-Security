import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import useToggle from '../../hooks/useToogle';
import { themes } from '../../styles/ColorStyles';
import { MenuButton } from '../elements/MenuButton';

// TODO: 10) Añadir testing para Header

export const home = {
  title: 'nav.home',
  link: '/'
};

export const menuData = [
  {
    title: 'nav.dashboard',
    link: '/dashboard'
  },
  {
    title: 'nav.admin',
    link: '/admin'
  }
];

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  // TODO: 7) Add the menu button with a logout action

  const [isVisible, toggle] = useToggle(false);

  return (
    <Wrapper>
      <Link to={home.link}>
        <LinkButton>{t(home.title)}</LinkButton>
      </Link>
      <LogoutWrapper>
        <MenuWrapper count={menuData.length}>
          {menuData.map((item, index) => (
            <Link to={item.link} key={index}>
              <LinkButton>{t(item.title)}</LinkButton>
            </Link>
          ))}
        </MenuWrapper>
        {user && (
          <MenuButton
            isVisible={isVisible}
            toggle={toggle}
            actions={[
              {
                title: 'Logout',
                isWarning: true,
                action: () => {
                  try {
                    logout();
                    toggle();
                  } catch (e) {
                    console.log('Error logging out');
                  }
                }
              }
            ]}
            xAxis={30}
            yAxis={46}
            dotButtonColorLight={true}
          />
        )}
      </LogoutWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1234px; */
  height: 30px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  padding: 30px 30px;
  z-index: 3;
  background-color: ${themes.light.primary};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }
`;
interface MenuWrapperProps {
  count: number;
}

const LinkButton = styled.p`
  color: ${themes.dark.text1};
`;

const MenuWrapper = styled.div<MenuWrapperProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, auto);
  gap: 30px;
`;

const LogoutWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 4px;
  align-items: center;
`;

// const Logo = styled.img`
//   height: 30px;
// `;
