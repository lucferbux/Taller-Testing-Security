import type { Meta, StoryObj } from '@storybook/react';
import ProjectCard from './ProjectCard';

import { Project } from '../../model/project';
import { User } from '../../model/user';

const project: Project = {
  _id: '8a9sdfasdf989fd',
  title: 'React',
  description:
    'React es el Framework web basado en componentes de Facebook. Cuenta con una curva de aprendizaje corta y mucha flexibilidad',
  version: '17.0.1',
  link: 'https://reactjs.org/docs/hello-world.html',
  tag: 'JavaScript, Typescript, React',
  timestamp: 765817712000
};

const userLoggged: User = {
  active: true,
  id: 'a8sfd9sf',
  email: 'johndoe@gmail.com'
};

const meta: Meta = {
  title: 'ThreePoints/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    project: project,
    user: undefined
  }
};

export const LoggedIn: Story = {
  args: {
    project: project,
    user: userLoggged
  }
};

export const Caption: Story = {
  args: {
    project: project,
    user: undefined,
    captionText: 'New version'
  }
};
