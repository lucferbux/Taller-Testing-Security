import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AboutMeCard from './AboutMeCard';

export default {
  title: 'ThreePoints/AboutMeCard',
  component: AboutMeCard
} as ComponentMeta<typeof AboutMeCard>;

export const AboutMeCardStory: ComponentStory<typeof AboutMeCard> = () => {
  const aboutMe = {
    _id: '8a9sdfasdf989fd',
    name: 'Lucas Fernández Aragón',
    birthday: 765817712000,
    nationality: 'Spain',
    job: 'Red Hat',
    github: 'https://github.com/lucferbux'
  };

  return <AboutMeCard aboutMe={aboutMe} />;
};
