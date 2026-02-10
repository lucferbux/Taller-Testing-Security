// Importar matchers de @testing-library/jest-dom
require('@testing-library/jest-dom');

// Configuración global para todos los tests
global.console = {
  ...console,
  error: jest.fn(), // Silenciar errores en tests
  warn: jest.fn(),  // Silenciar warnings en tests
};

// Mock de window.matchMedia (usado por algunos componentes)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de import.meta.env (variables de entorno de Vite)
if (typeof global.import === 'undefined') {
  global.import = {};
}
global.import.meta = {
  env: {
    VITE_API_URI: 'http://localhost:3000/api',
    VITE_BASE_URI: 'http://localhost:5173',
  },
};