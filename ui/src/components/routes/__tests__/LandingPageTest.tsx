import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage';

test('Landing Title', () => {
  const { getByText } = render(<LandingPage />);
  expect(getByText('landing.title')).toBeInTheDocument();
});

test('Landing Animation', () => {
  render(<LandingPage />);
  expect(screen.getByTestId('lottieImg')).toBeInTheDocument();
});
