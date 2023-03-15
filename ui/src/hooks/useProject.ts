import { useContext } from 'react';
import ProjectContext from '../context/ProjectContext';

export default function useProject() {
  const project = useContext(ProjectContext);
  return project;
}
