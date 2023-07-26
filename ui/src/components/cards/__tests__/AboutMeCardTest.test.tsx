import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import { AboutMe } from '../../../model/aboutme';
import AboutMeCard from '../AboutMeCard';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from 'vitest';

const aboutMeMock: AboutMe = {
  _id: '8a9sdfasdf989fd',
  name: 'Lucas Fernández Aragón',
  birthday: 765817712000,
  nationality: 'Spain',
  job: 'Red Hat',
  github: 'https://github.com/lucferbux'
};

describe('AboutMeCard', () => {
  test('renders name', () => {
    const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />);
    expect(getByText(aboutMeMock.name)).toBeInTheDocument();
  });

  test('renders nationality', () => {
    const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />);
    expect(getByText(aboutMeMock.nationality || '')).toBeInTheDocument();
  });

  test('renders job', () => {
    const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />);
    expect(getByText(aboutMeMock.job || '')).toBeInTheDocument();
  });

  test('renders link', () => {
    const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />);
    expect(getByText(aboutMeMock.github || '')).toBeInTheDocument();
  });

  test('image is render', () => {
    render(<AboutMeCard aboutMe={aboutMeMock} />);
    expect(screen.getByTestId('aboutImg')).toBeInTheDocument();
  });
});
