import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProjectCard from "./ProjectCard";
import { Project } from "../../model/project";
import { User } from "../../model/user";

export default {
  title: "ThreePoints/ProjectCard",
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>;

const project: Project = {
  _id: "8a9sdfasdf989fd",
  title: "React",
  description: "React es el Framework web basado en componentes de Facebook. Cuenta con una curva de aprendizaje corta y mucha flexibilidad",
  version: "17.0.1",
  link: "https://reactjs.org/docs/hello-world.html",
  tag: "JavaScript, Typescript, React",
  timestamp: 765817712000
};

const userLoggged: User = { active: true, id: "a8sfd9sf", email: "johndoe@gmail.com" }

const Template: ComponentStory<typeof ProjectCard> = (args) => <ProjectCard {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  project: project,
  closeButton: () => {},
  updateButton: () => {},
  user: undefined
}

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  project: project,
  closeButton: () => {},
  updateButton: () => {},
  user: userLoggged
}

export const Caption = Template.bind({});
Caption.args = {
  project: project,
  closeButton: () => {},
  updateButton: () => {},
  user: undefined,
  captionText: "New version"
}