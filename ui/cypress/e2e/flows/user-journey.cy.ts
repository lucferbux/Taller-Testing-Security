// cypress/e2e/flows/user-journey.cy.ts

describe('Flujo completo Landing → Dashboard → Login', () => {
  it('recorre landing, dashboard y login verificando datos y request', () => {
    // Configurar mocks antes de iniciar
    cy.intercept('GET', '**/v1/aboutme/', { fixture: 'aboutme.json' }).as('getAboutMe');
    cy.intercept('GET', '**/v1/projects/', { fixture: 'projects.json' }).as('getProjects');
    cy.mockLoginApi({ success: true });

    // 1) Landing
    cy.visit('/');
    cy.contains(/welcome|portfolio|portafolio/i).should('be.visible');

    // 2) Ir a Dashboard
    cy.contains(/dashboard/i).click();
    cy.url().should('include', '/dashboard');
    cy.wait(['@getAboutMe', '@getProjects']);

    // Verificar datos del dashboard
    cy.contains('Lucas Fernandez').should('be.visible');
    cy.contains('Taller Testing & Security').should('be.visible');

    // 3) Ir a Login desde el header o menú
    cy.visit('/login');
    cy.url().should('include', '/login');

    // Verificar formulario y completar
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('input[type="submit"]').click();

    // Verificar petición enviada y redirección
    cy.wait('@loginSuccess');
    
    cy.url().should('include', '/admin');
  });

  it('debe permitir navegar con teclado en login', () => {
    cy.mockLoginApi({ success: true });
    cy.visit('/login');

    cy.get('input[name="email"]').focus().type('test@example.com');
    cy.get('input[name="password"]').focus().type('password123');

    // Submit con Enter en el botón
    cy.get('input[type="submit"]').focus().type('{enter}');

    cy.wait('@loginSuccess');
    cy.url().should('include', '/admin');
  });

  it('debe enviar credenciales correctamente', () => {
    cy.intercept('POST', '**/auth/login', (req) => {
      const body = typeof req.body === 'string' ? new URLSearchParams(req.body) : req.body;
      const email = body instanceof URLSearchParams ? body.get('email') : body.email;
      const password = body instanceof URLSearchParams ? body.get('password') : body.password;
      expect(email).to.eq('user@example.com');
      expect(password).to.eq('password123');
      const validJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.Qs8nKjZ7GJXK7YjA_rOqwM7hK5dYWLNg8c3d_mLc8Z0';
      req.reply({ statusCode: 200, body: { token: validJwtToken } });
    }).as('login');

    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[type="submit"]').click();

    cy.wait('@login');
    cy.url().should('include', '/admin');
  });
});