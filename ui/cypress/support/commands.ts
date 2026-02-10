/// <reference types="cypress" />

/**
 * Login via UI - útil para testear el flujo de login
 */
Cypress.Commands.add('loginByUI', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[type="submit"]').click();
  cy.url().should('include', '/admin');
});

/**
 * Logout - limpia sesión y redirige a home
 */
Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage('token');
  cy.visit('/');
});

/**
 * Selector por data-testid - más resistente a cambios de UI
 */
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

/**
 * Mock de login API
 * 
 * IMPORTANTE: Usa un JWT válido porque la app usa jwt_decode
 * para extraer fechas de expiración del token.
 */
Cypress.Commands.add('mockLoginApi', (options?: {
  success?: boolean;
  token?: string;
  delay?: number;
}) => {
  // JWT válido que expira en 2030
  const validJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.Qs8nKjZ7GJXK7YjA_rOqwM7hK5dYWLNg8c3d_mLc8Z0';
  
  if (options?.success === false) {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' }
    }).as('loginError');
  } else {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: { token: options?.token || validJwtToken },
      delay: options?.delay || 0
    }).as('loginSuccess');
  }
});

/**
 * Mock de APIs del dashboard
 */
Cypress.Commands.add('mockDashboardApi', (options?: { 
  aboutMe?: object; 
  projects?: object[];
  delay?: number;
  error?: boolean;
}) => {
  const defaultAboutMe = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test User',
    birthday: 631152000000,
    nationality: 'Spanish',
    job: 'Software Developer',
    github: 'https://github.com/test'
  };

  const defaultProjects = [{
    _id: '507f1f77bcf86cd799439012',
    title: 'Test Project',
    description: 'Description',
    version: '1.0.0',
    link: 'https://github.com/test/project',
    tag: 'testing',
    timestamp: Date.now()
  }];

  if (options?.error) {
    cy.intercept('GET', '**/v1/aboutme/', { statusCode: 500 }).as('getAboutMeError');
    cy.intercept('GET', '**/v1/projects/', { statusCode: 500 }).as('getProjectsError');
  } else {
    cy.intercept('GET', '**/v1/aboutme/', {
      statusCode: 200,
      body: options?.aboutMe || defaultAboutMe,
      delay: options?.delay || 0
    }).as('getAboutMe');

    cy.intercept('GET', '**/v1/projects/', {
      statusCode: 200,
      body: options?.projects || defaultProjects,
      delay: options?.delay || 0
    }).as('getProjects');
  }
});

/**
 * Visita una ruta configurando los mocks del dashboard
 */
Cypress.Commands.add('visitWithMocks', (path: string, options?: { delay?: number; error?: boolean }) => {
  cy.mockDashboardApi(options);
  cy.visit(path);
});

// Declaraciones TypeScript para autocompletado
declare global {
  namespace Cypress {
    interface Chainable {
      loginByUI(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      mockLoginApi(options?: { success?: boolean; token?: string; delay?: number }): Chainable<void>;
      mockDashboardApi(options?: { aboutMe?: object; projects?: object[]; delay?: number; error?: boolean }): Chainable<void>;
      visitWithMocks(path: string, options?: { delay?: number; error?: boolean }): Chainable<void>;
    }
  }
}

export {};