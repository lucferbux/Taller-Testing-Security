import React from 'react';
import Header from '../header';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { vi, test, expect } from 'vitest';

vi.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {}
  }
}));

test('check exact three links', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getAllByRole('link').length).toEqual(3);

  expect(screen.getByText('nav.home')).toBeInTheDocument();
  expect(screen.getByText('nav.dashboard')).toBeInTheDocument();
  expect(screen.getByText('nav.admin')).toBeInTheDocument();
});
