import React from "react";

import {render, fireEvent, screen, getByRole} from '@testing-library/react';

import { AboutMe } from "../../../model/aboutme";
import AboutMeCard from "../AboutMeCard";



const aboutMeMock: AboutMe = {
  _id: "8a9sdfasdf989fd",
  name: "Lucas Fernández Aragón",
  birthday: 765817712000,
  nationality: "Spain",
  job: "Red Hat",
  github: "https://github.com/lucferbux"
};


test('Card Name', () => {
  const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />)
  expect(getByText(aboutMeMock.name)).toBeInTheDocument();
})

test('Card Nationality', () => {
  const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />)
  expect(getByText(aboutMeMock.nationality!)).toBeInTheDocument();
})

test('Card Job', () => {
  const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />)
  expect(getByText(aboutMeMock.job!)).toBeInTheDocument();
})

test('Card Link', () => {
  const { getByText } = render(<AboutMeCard aboutMe={aboutMeMock} />)
  expect(getByText(aboutMeMock.github!)).toBeInTheDocument();
})

test('Image rendered', () => {
  render(<AboutMeCard aboutMe={aboutMeMock} />)
  expect(screen.getByTestId("aboutImg")).toBeInTheDocument();
})
