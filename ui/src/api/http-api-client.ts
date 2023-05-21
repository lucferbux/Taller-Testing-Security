import ApiClient, {
  ApiError,
  BadRequest,
  Forbidden,
  GenericError,
  NotFound,
  DashboardInfo,
  PreconditionFailed,
  PreconditionRequired,
  ProjectResponse,
  TokenResponse,
  Unauthorized,
  UnprocessableEntity
} from './api-client';

import { removeUser } from '../utils/auth';
import { Project } from '../model/project';
import { AboutMe } from '../model/aboutme';

async function createApiError(response: Response | XMLHttpRequest): Promise<ApiError> {
  switch (response.status) {
    case 400:
      return new BadRequest();
    case 401:
      return new Unauthorized();
    case 403:
      return new Forbidden();
    case 404:
      return new NotFound();
    case 412:
      return new PreconditionFailed();
    case 415:
    case 422:
      try {
        const detail = 'json' in response ? (await response.json()).detail : response.responseText;
        return new UnprocessableEntity(detail);
      } catch (e) {
        return new UnprocessableEntity();
      }
    case 428:
      return new PreconditionRequired();
  }
  return new GenericError(
    response.status,
    'text' in response ? await response.text() : response.responseText
  );
}

const handleResponse = async <T>(func: () => Promise<T>): Promise<T> => {
  try {
    return await func();
  } catch (e) {
    if (e instanceof Unauthorized) {
      // TODO: 4) Refactor auth calls
      removeUser();
      window.location.replace('/');
    }
    throw e;
  }
};

// TODO: 5) Remove authorization header from all requests
export default class HttpApiClient implements ApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async token(email: string, password: string): Promise<TokenResponse> {
    const body = new URLSearchParams({
      email: email,
      password: password
    });
    const response = await fetch(this.baseUrl + '/auth/login/', {
      method: 'POST',
      body: body
    });
    if (!response.ok) {
      throw await createApiError(response);
    }
    return response.json();
  }

  // TODO: 5) Add logout to api call

  logout = async (): Promise<ProjectResponse> => {
    const response = await fetch(this.baseUrl + '/auth/logout/', {
      method: 'POST'
    });
    if (!response.ok) {
      throw await createApiError(response);
    }
    return response.json();
  };

  getAboutMe = (): Promise<AboutMe> =>
    handleResponse(async () => {
      const response = await fetch(this.baseUrl + `/v1/aboutme/`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw await createApiError(response);
      }
      return response.json();
    });

  getProjects = (): Promise<Project[]> =>
    handleResponse(async () => {
      const response = await fetch(this.baseUrl + `/v1/projects/`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw await createApiError(response);
      }
      return response.json();
    });

  getDashboardInfo = (): Promise<DashboardInfo> => {
    return Promise.all([this.getAboutMe(), this.getProjects()]).then(([aboutMe, projects]) => {
      return {
        aboutMe,
        projects
      };
    });
  };

  postProject = async (project: Project): Promise<ProjectResponse> => {
    const response = await fetch(this.baseUrl + '/v1/projects/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });
    if (!response.ok) {
      throw await createApiError(response);
    }
    return response.json();
  };

  updateProject = async (project: Project): Promise<ProjectResponse> => {
    const response = await fetch(this.baseUrl + '/v1/projects/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });
    if (!response.ok) {
      throw await createApiError(response);
    }
    return response.json();
  };

  createOrUpdateProject = async (project: Project): Promise<ProjectResponse> => {
    if (project._id === undefined) {
      return this.postProject(project);
    } else {
      return this.updateProject(project);
    }
  };

  deleteProject = async (projectId: string): Promise<ProjectResponse> => {
    const response = await fetch(this.baseUrl + '/v1/projects/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: projectId })
    });
    if (!response.ok) {
      throw await createApiError(response);
    }
    return response.json();
  };
}
