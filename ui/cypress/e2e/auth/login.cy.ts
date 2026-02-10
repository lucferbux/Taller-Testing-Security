// cypress/e2e/auth/login.cy.ts

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    describe('Validación de campos vacíos', () => {
        it('muestra error cuando email y password están vacíos', () => {
            cy.get('input[type="submit"]').click();

            cy.contains(/username and password must not be empty/i).should('be.visible');
            cy.url().should('include', '/login');
        });
    });

    describe('Login exitoso con mock', () => {
        it('envía la petición y redirige al dashboard', () => {
            // Mockear respuesta de la API
            cy.mockLoginApi({ success: true });

            // Llenar formulario
            cy.get('input[name="email"]').type('test@example.com');
            cy.get('input[name="password"]').type('password123');
            cy.get('input[type="submit"]').click();

            // Esperar respuesta
            cy.wait('@loginSuccess');

            // Verificar redirección
            cy.url().should('include', '/admin');
        });
    });

    describe('Login fallido', () => {
        it('muestra mensaje de error y permanece en /login', () => {
            cy.mockLoginApi({ success: false });

            cy.get('input[name="email"]').type('wrong@example.com');
            cy.get('input[name="password"]').type('wrongpass');
            cy.get('input[type="submit"]').click();

            cy.wait('@loginError');

            cy.contains(/invalid login/i).should('be.visible');
            cy.url().should('include', '/login');
        });
    });

    describe('Estado de loading', () => {
        it('muestra indicador de loading mientras espera la respuesta', () => {
            cy.mockLoginApi({ success: true, delay: 1000 });

            cy.get('input[name="email"]').type('load@example.com');
            cy.get('input[name="password"]').type('loading-pass');
            cy.get('input[type="submit"]').click();

            cy.contains(/loading/i).should('be.visible');
            cy.wait('@loginSuccess');
            cy.contains(/loading/i).should('not.exist');
        });
    });
});