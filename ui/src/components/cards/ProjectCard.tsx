import React from 'react';
import styled from 'styled-components';
import useToggle from '../../hooks/useToogle';
import { Project } from '../../model/project';
import { User } from '../../model/user';
import { themes } from '../../styles/ColorStyles';
import { H3, DescriptionCard, SmallText, SmallText2 } from '../../styles/TextStyles';
import { MenuButton } from '../elements/MenuButton';
import codeIcon from './code.svg';

// TODO: 10) Añadir testing para ProjectCard

// TODO: 11) Crear storybook para Project Card
// TODO: 12) Crear tests de integración con testing-library/react para ProjectCard

interface ProjectCardProps {
  project: Project;
  user: User | undefined;
  closeButton: (element: React.MouseEvent<HTMLElement>, id: string) => void;
  updateButton: (element: React.MouseEvent<HTMLElement>, project: Project) => void;
  captionText?: string;
}

// TODO: 11) Crear storybook para Project Card
// TODO: 12) Crear tests de integración con testing-library/react para ProjectCard

const ProjectCard = (props: ProjectCardProps) => {
  const { project } = props;

  // TODO: 9) Change useAuth to props

  const [isVisible, toggle] = useToggle(false);

  // TODO: 6) Move de logic of the menu to a new component
  // 1. Create a new component called MenuButton
  // 2. Define the props of the component
  // 3. Move away all the subcomponents and logic to the new component
  // 4. Import the component here

  return (
    <Wrapper href={project.link} target="_blank" rel="noopener">
      <CardWrapper>
        <CardInfo>
          <CardVersion>
            <CardVersionText>{project.version}</CardVersionText>
          </CardVersion>
          {props.user && (
            <MenuButton
              isVisible={isVisible}
              toggle={toggle}
              actions={[
                {
                  title: 'Update',
                  isWarning: false,
                  action: (e: React.MouseEvent<HTMLElement>) => {
                    props.updateButton(e, project);
                  }
                },
                {
                  title: 'Delete',
                  isWarning: true,
                  action: (e: React.MouseEvent<HTMLElement>) => {
                    props.closeButton(e, project._id ?? '');
                    toggle();
                  }
                }
              ]}
            />
          )}
        </CardInfo>
        <CardCaption data-testid="caption">
          {props.captionText ? props.captionText : ''}
        </CardCaption>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>

        <ProjectTags>
          <TagIconWrapper>
            <TagIcon src={codeIcon} alt="Icon Tag Project" />
          </TagIconWrapper>
          <TagText>{project.tag}</TagText>
        </ProjectTags>
      </CardWrapper>
    </Wrapper>
  );
};

export default ProjectCard;

const CardCaption = styled(SmallText2)``;

const CardInfo = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
`;

const CardVersion = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 2px 6px;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CardVersionText = styled(SmallText2)``;

const CardTitle = styled(H3)`
  font-style: normal;
  word-break: break-word;

  @media (max-width: 450px) {
    font-size: 26px;
  }
`;
const CardDescription = styled(DescriptionCard)``;

const ProjectTags = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 32px auto;
  align-items: center;
`;

const TagIconWrapper = styled.div`
  display: grid;
  align-items: center;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50px;
`;

const TagIcon = styled.img`
  margin: auto;
  width: 20px;
  height: 20px;
`;

const TagText = styled(SmallText)`
  line-height: 100%;
`;

const CardWrapper = styled.div`
  ${themes.light.card}
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  position: relative;
  display: grid;
  color: ${themes.light.text1};
  gap: 12px;
  text-align: left;
  width: 280px;
  height: 320px;
  backdrop-filter: blur(40px);
  border-radius: 20px;
  padding: 20px;
  animation: fadein 0.4s;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
    color: ${themes.dark.text1};
  }

  @media (max-width: 450px) {
    width: auto;
    min-width: 240px;
    height: 280px;
  }

  @media (max-width: 700px) {
    min-width: 240px;
    width: auto;
    max-width: 450px;
    height: 280px;
  }

  :hover {
    transform: scale(1.03);
  }
  :active {
    transform: scale(1.01);
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Wrapper = styled.a`
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  cursor: pointer;
  width: 280px;
  height: 320px;
  @media (max-width: 450px) {
    width: auto;
    min-width: 240px;
    margin: 0px 0px;
  }

  @media (max-width: 700px) {
    min-width: 240px;
    width: auto;
    max-width: 450px;
    margin: 0px 0px;
  }
`;
