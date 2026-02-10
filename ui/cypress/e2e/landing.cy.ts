// cypress/e2e/landing.cy.ts

describe('Landing Page', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('debe cargar la página correctamente', () => {
    // Verificar que estamos en la URL correcta
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Verificar que existe un título
    cy.get('h1').should('be.visible');
  });

  it('debe mostrar navegación', () => {
    // Verificar links de navegación
    cy.contains(/home|inicio/i).should('be.visible');
    cy.contains(/dashboard/i).should('be.visible');
  });
});