module.exports = {
  // Entorno de ejecución
  testEnvironment: 'jsdom',
  
  // Preset para TypeScript
  preset: 'ts-jest',
  
  // Paths de módulos - Mapear imports de Vite
  moduleNameMapper: {
    // CSS Modules y estilos
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    // Assets (imágenes, SVGs, etc.)
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.cjs',
    
    // Alias de Vite (si los usas en vite.config.ts)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Archivos de setup
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  
  // Extensiones de archivos
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Patrones de tests
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  
  // Coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',           // Entry point
    '!src/vite-env.d.ts',      // Vite types
    '!src/**/*.stories.tsx',   // Storybook (si lo tienes)
  ],
  
  // Ignorar
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  
  // Transformaciones
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
        },
      },
    ],
  },
};