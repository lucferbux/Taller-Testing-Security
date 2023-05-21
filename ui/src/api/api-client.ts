import { AboutMe } from '../model/aboutme';
import { Project } from '../model/project';

export interface ApiError {
  description?: string;
}

export class BadRequest implements ApiError {}

export class GenericError implements ApiError {
  constructor(httpCode: number, description: string) {
    this.httpCode = httpCode;
    this.description = description;
  }

  httpCode: number;

  description: string;
}

export class Timeout implements ApiError {}
export class Forbidden implements ApiError {}
export class Unauthorized implements ApiError {}
export class NotFound implements ApiError {}
export class UnprocessableEntity implements ApiError {
  constructor(public description?: string) {}
}
export class PreconditionFailed implements ApiError {}
export class PreconditionRequired implements ApiError {}

export interface TokenResponse {
  token: string;
}

export interface ProjectResponse {
  message: string;
}

export interface DashboardInfo {
  aboutMe: AboutMe;
  projects: Project[];
}

export default interface ApiClient {
  token(email: string, password: string): Promise<TokenResponse>;
  // TODO: 5) Add logout to api call
  getAboutMe(): Promise<AboutMe>;
  getProjects(): Promise<Project[]>;
  getDashboardInfo(): Promise<DashboardInfo>;
  postProject(project: Project): Promise<ProjectResponse>;
  updateProject(project: Project): Promise<ProjectResponse>;
  createOrUpdateProject(project: Project): Promise<ProjectResponse>;
  deleteProject(projectId: string): Promise<ProjectResponse>;
}
