import { ProjectPayload } from '../fixtures/projects';

let counter = 0;

export function resetProjectFactory(): void {
  counter = 0;
}

export function buildProject(overrides: Partial<ProjectPayload> = {}): ProjectPayload {
  const id = ++counter;
  const base: ProjectPayload = {
    title: `Proyecto ${id}`,
    description: `Descripción ${id}`,
    version: `1.0.${id}`,
    link: `https://project-${id}.example.com`,
    tag: `tag-${id}`,
    timestamp: Date.now() + id
  };

  return { ...base, ...overrides };
}

export function buildProjects(count: number): ProjectPayload[] {
  return Array.from({ length: count }, () => buildProject());
}
