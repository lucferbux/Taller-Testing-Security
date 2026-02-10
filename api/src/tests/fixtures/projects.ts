export type ProjectPayload = {
  title: string;
  description?: string;
  version?: string;
  link?: string;
  tag?: string;
  timestamp: number;
};

export const validProject: ProjectPayload = {
  title: 'Proyecto válido',
  description: 'Descripción válida',
  version: '1.0.0',
  link: 'https://valid.example.com',
  tag: 'valid',
  timestamp: Date.now()
};

export const invalidProjects = {
  noTitle: {
    description: 'Falta título',
    version: '0.0.1',
    link: 'https://example.com',
    tag: 'invalid',
    timestamp: Date.now()
  },
  emptyTitle: {
    title: '',
    description: 'Título vacío',
    version: '0.0.1',
    link: 'https://example.com',
    tag: 'invalid',
    timestamp: Date.now()
  },
  nonNumericTimestamp: {
    title: 'Sin timestamp numérico',
    description: 'Timestamp inválido',
    version: '0.0.1',
    link: 'https://example.com',
    tag: 'invalid',
    timestamp: Number.NaN
  }
};

export const sampleProjects: ProjectPayload[] = [
  {
    title: 'Proyecto Alpha',
    description: 'Alpha desc',
    version: '1.0.0',
    link: 'https://alpha.example.com',
    tag: 'alpha',
    timestamp: Date.now()
  },
  {
    title: 'Proyecto Beta',
    description: 'Beta desc',
    version: '1.1.0',
    link: 'https://beta.example.com',
    tag: 'beta',
    timestamp: Date.now() + 1
  },
  {
    title: 'Proyecto Gamma',
    description: 'Gamma desc',
    version: '1.2.0',
    link: 'https://gamma.example.com',
    tag: 'gamma',
    timestamp: Date.now() + 2
  }
];
