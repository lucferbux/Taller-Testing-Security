import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';
import { User } from '../../model/user';
import { AuthProvider } from '../../context/AuthContext';

const userLoggged: User = {
  active: true,
  id: 'a8sfd9sf',
  email: 'johndoe@gmail.com'
};

const meta: Meta = {
  title: 'ThreePoints/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'expanded',
    viewMode: 'info'
  },
  decorators: [
    (Header) => (
        <BrowserRouter>
          <Header />
        </BrowserRouter>
    )
  ]
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: userLoggged,
    logout: () => {}
  }
};

export const LoggedOut: Story = {
  args: {
    user: undefined,
    logout: () => {}
  }
};
