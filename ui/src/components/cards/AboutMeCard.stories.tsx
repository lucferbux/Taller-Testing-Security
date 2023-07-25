import type { Meta, StoryObj } from '@storybook/react';

import AboutMeCard from './AboutMeCard';

const meta: Meta = {
  title: 'ThreePoints/AboutMeCard',
  component: AboutMeCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof AboutMeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    aboutMe: {
      _id: '8a9sdfasdf989fd',
      name: 'Lucas Fernández Aragón',
      birthday: 765817712000,
      nationality: 'Spain',
      job: 'Red Hat',
      github: 'https://github.com/lucferbux'
    }
  }
};
