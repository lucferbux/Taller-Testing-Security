import { createContext, ReactNode, useCallback, useState } from 'react';
import { Project } from '../model/project';

type ProjectcontextType = {
  project: Project | undefined;
  addProject: (newProject: Project) => void;
  removeProject: () => void;
};

const ProjectContext = createContext<ProjectcontextType>({
  project: undefined,
  addProject: () => {},
  removeProject: () => {}
});

interface Props {
  children: ReactNode;
}

export function ProjectProvider({ children }: Props) {
  const [project, setProject] = useState<Project | undefined>(undefined);

  const addProject = useCallback(
    (newProject: Project) => {
      setProject(newProject);
    },
    [setProject]
  );

  const removeProject = useCallback(() => {
    setProject(undefined);
  }, [setProject]);


  return (
    <ProjectContext.Provider value={{ project, addProject, removeProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
