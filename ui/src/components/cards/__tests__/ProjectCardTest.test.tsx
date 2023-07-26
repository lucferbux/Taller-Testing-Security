import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import ProjectCard from '../ProjectCard';
import { Project } from '../../../model/project';
import { User } from '../../../model/user';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from 'vitest';

const projectMock: Project = {
  _id: '8a9sdfasdf989fd',
  title: 'React',
  description:
    'React es el Framework web basado en componentes de Facebook. Cuenta con una curva de aprendizaje corta y mucha flexibilidad',
  version: '17.0.1',
  link: 'https://reactjs.org/docs/hello-world.html',
  tag: 'JavaScript, Typescript, React',
  timestamp: 765817712000
};

const userLogggedMock: User = {
  active: true,
  id: 'a8sfd9sf',
  email: 'johndoe@gmail.com'
};

const mockFeatured = 'FEATURED';

describe('ProjectCard', () => {
  test('renders title', () => {
    const { getByText } = render(
      <ProjectCard
        project={projectMock}
        user={undefined}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(getByText(projectMock.title)).toBeInTheDocument();
  });

  test('renders description', () => {
    const { getByText } = render(
      <ProjectCard
        project={projectMock}
        user={undefined}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(getByText(projectMock.description)).toBeInTheDocument();
  });

  test('renders version', () => {
    const { getByText } = render(
      <ProjectCard
        project={projectMock}
        user={undefined}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(getByText(projectMock.version)).toBeInTheDocument();
  });

  test('renders', () => {
    const { getByText } = render(
      <ProjectCard
        project={projectMock}
        user={undefined}
        captionText={mockFeatured}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(getByText(mockFeatured)).toBeInTheDocument();
  });

  test('Featured empty', () => {
    render(
      <ProjectCard
        project={projectMock}
        user={undefined}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(screen.getByTestId('caption').textContent).toBe('');
  });

  test('User logged', () => {
    render(
      <ProjectCard
        project={projectMock}
        user={userLogggedMock}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(screen.getByTestId('menuButton')).toBeInTheDocument();
  });

  test('Caption empty', () => {
    render(
      <ProjectCard
        project={projectMock}
        user={undefined}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(screen.getByTestId('caption').textContent).toBe('');
  });

  test('External link', () => {
    render(
      <ProjectCard
        project={projectMock}
        user={undefined}
        closeButton={() => {}}
        updateButton={() => {}}
      />
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', projectMock.link);
  });
});
