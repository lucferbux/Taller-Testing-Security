import React from "react";
import Header from "../header";
import {render, fireEvent, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

jest.mock('react-i18next')

test('check exact three links', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  
  )
  expect(screen.getAllByRole("link").length).toEqual(3);

  expect(screen.getByText("nav.home")).toBeInTheDocument();
  expect(screen.getByText("nav.dashboard")).toBeInTheDocument();
  expect(screen.getByText("nav.admin")).toBeInTheDocument();
})
