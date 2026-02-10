// Importar custom commands
import './commands';

// Manejar errores no capturados de la aplicación
Cypress.on('uncaught:exception', (err) => {
  // Ignorar errores de ResizeObserver (comunes en React)
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  return true;
});