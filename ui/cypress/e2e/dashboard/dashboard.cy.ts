// cypress/e2e/dashboard/dashboard.cy.ts

describe('Dashboard Page', () => {
  describe('Carga de datos con fixtures', () => {
    it('muestra los datos del perfil desde fixture', () => {
      cy.intercept('GET', '**/v1/aboutme/', { fixture: 'aboutme.json' }).as('getAboutMe');
      cy.intercept('GET', '**/v1/projects/', { fixture: 'projects.json' }).as('getProjects');

      cy.visit('/dashboard');
      cy.wait(['@getAboutMe', '@getProjects']);

      cy.contains('Lucas Fernandez').should('be.visible');
      cy.contains('Spanish').should('be.visible');
      cy.contains('Taller Testing & Security').should('be.visible');
    });

    it('muestra los proyectos del fixture', () => {
      cy.intercept('GET', '**/v1/aboutme/', { fixture: 'aboutme.json' }).as('getAboutMe');
      cy.intercept('GET', '**/v1/projects/', { fixture: 'projects.json' }).as('getProjects');

      cy.visit('/dashboard');
      cy.wait(['@getAboutMe', '@getProjects']);

      cy.contains('Taller Testing & Security').should('be.visible');
      cy.contains('Proyecto educativo sobre testing y seguridad').should('be.visible');
    });
  });

  describe('Estado de loading', () => {
    it('muestra el loader mientras las peticiones tardan', () => {
      cy.mockDashboardApi({ delay: 1000 });

      cy.visit('/dashboard');

      cy.contains(/loading/i).should('be.visible');
      cy.wait(['@getAboutMe', '@getProjects']);
      cy.contains(/loading/i).should('not.exist');
    });
  });

  describe('Manejo de errores', () => {
    it('debe mostrar error cuando la API falla', () => {
      // Mockear error
      cy.mockDashboardApi({ error: true });
      
      cy.visit('/dashboard');
      
      // Verificar mensaje de error
      cy.contains(/error/i).should('be.visible');
    });
  });

  describe('Navegación desde dashboard', () => {
    it('permite ir al Home desde el header', () => {
      cy.mockDashboardApi();
      cy.visit('/dashboard');
      cy.wait(['@getAboutMe', '@getProjects']);

      cy.get('a[href="/"]').first().click();

      cy.url().should('match', /\/$/);
    });
  });
});