import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // URL base - Vite usa puerto 5173 por defecto
    baseUrl: 'http://localhost:5173',
    
    // Tamaño de ventana del navegador
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts (en milisegundos)
    defaultCommandTimeout: 10000,  // Espera máxima para comandos
    requestTimeout: 10000,          // Espera máxima para requests
    responseTimeout: 30000,         // Espera máxima para respuestas
    
    // Reintentos automáticos en caso de fallo
    retries: {
      runMode: 2,   // 2 reintentos en CI/CD (cypress run)
      openMode: 0   // Sin reintentos en desarrollo (cypress open)
    },
    
    // Screenshots y videos
    screenshotOnRunFailure: true,  // Captura cuando falla un test
    video: false,                   // Desactivado para ahorrar espacio
    
    // Archivos
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    
    // Tareas personalizadas
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },
  
  // Variables de entorno accesibles con Cypress.env('nombre')
  env: {
    apiUrl: 'http://localhost:3000/api',
    testUser: {
      email: 'test@example.com',
      password: 'test123'
    }
  }
});