import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectProvider } from '../../context/ProjectContext';
import useProject from '../../hooks/useProject';
import { Project } from '../../model/project';
import { ReactNode } from 'react';

// Wrapper para renderHook
const wrapper = ({ children }: { children: ReactNode }) => (
  <ProjectProvider>{children}</ProjectProvider>
);

describe('ProjectContext', () => {
  // Mock de proyecto para tests
  const mockProject: Project = {
    _id: '123',
    title: 'Test Project',
    description: 'A test project',
    version: '1.0.0',
    link: 'https://test.com',
    tag: 'react',
    timestamp: Date.now()
  };

  const updatedProject: Project = {
    _id: '123',
    title: 'Updated Project',
    description: 'An updated project',
    version: '2.0.0',
    link: 'https://updated.com',
    tag: 'typescript',
    timestamp: Date.now()
  };

  describe('Estado inicial', () => {
    it('debe comenzar con project undefined', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Verificar que project comienza como undefined (equivalente a vacío)
      expect(result.current.project).toBeUndefined();
    });

    it('debe tener las funciones addProject y removeProject disponibles', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      expect(result.current.addProject).toBeDefined();
      expect(result.current.removeProject).toBeDefined();
      expect(typeof result.current.addProject).toBe('function');
      expect(typeof result.current.removeProject).toBe('function');
    });
  });

  describe('Agregar proyecto', () => {
    it('debe agregar un proyecto válido al estado', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Estado inicial
      expect(result.current.project).toBeUndefined();

      // Agregar proyecto
      act(() => {
        result.current.addProject(mockProject);
      });

      // Verificar que el proyecto se agregó
      expect(result.current.project).toBeDefined();
      expect(result.current.project?._id).toBe('123');
      expect(result.current.project?.title).toBe('Test Project');
      expect(result.current.project?.description).toBe('A test project');
    });

    it('debe reemplazar el proyecto existente al agregar uno nuevo', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Agregar primer proyecto
      act(() => {
        result.current.addProject(mockProject);
      });

      expect(result.current.project?.title).toBe('Test Project');

      // Agregar segundo proyecto (debe reemplazar)
      act(() => {
        result.current.addProject(updatedProject);
      });

      expect(result.current.project?.title).toBe('Updated Project');
      expect(result.current.project?._id).toBe('123');
    });
  });

  describe('Eliminar proyecto', () => {
    it('debe eliminar el proyecto del estado', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Agregar proyecto
      act(() => {
        result.current.addProject(mockProject);
      });

      expect(result.current.project).toBeDefined();

      // Eliminar proyecto
      act(() => {
        result.current.removeProject();
      });

      // Verificar que el proyecto fue eliminado
      expect(result.current.project).toBeUndefined();
    });

    it('debe poder eliminar sin romper cuando no hay proyecto', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Verificar estado inicial
      expect(result.current.project).toBeUndefined();

      // Intentar eliminar cuando no hay proyecto (no debe romper)
      expect(() => {
        act(() => {
          result.current.removeProject();
        });
      }).not.toThrow();

      // El estado sigue siendo undefined
      expect(result.current.project).toBeUndefined();
    });
  });

  describe('Actualizar proyecto', () => {
    it('debe actualizar los datos del proyecto correctamente', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Agregar proyecto inicial
      act(() => {
        result.current.addProject(mockProject);
      });

      expect(result.current.project?.title).toBe('Test Project');
      expect(result.current.project?.version).toBe('1.0.0');

      // Actualizar proyecto (usando addProject para actualizar)
      act(() => {
        result.current.addProject(updatedProject);
      });

      // Verificar que los datos cambiaron correctamente
      expect(result.current.project?.title).toBe('Updated Project');
      expect(result.current.project?.description).toBe('An updated project');
      expect(result.current.project?.version).toBe('2.0.0');
      expect(result.current.project?.link).toBe('https://updated.com');
      expect(result.current.project?.tag).toBe('typescript');
    });

    it('debe mantener el ID al actualizar el proyecto', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      act(() => {
        result.current.addProject(mockProject);
      });

      const originalId = result.current.project?._id;

      act(() => {
        result.current.addProject(updatedProject);
      });

      expect(result.current.project?._id).toBe(originalId);
    });
  });

  describe('Error handling', () => {
    it('debe manejar múltiples operaciones consecutivas sin romper', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Operaciones consecutivas
      expect(() => {
        act(() => {
          result.current.addProject(mockProject);
          result.current.removeProject();
          result.current.removeProject(); // Eliminar cuando ya está vacío
          result.current.addProject(updatedProject);
        });
      }).not.toThrow();

      expect(result.current.project?.title).toBe('Updated Project');
    });

    it('debe manejar valores null o undefined sin romper', () => {
      const { result } = renderHook(() => useProject(), { wrapper });

      // Agregar y luego múltiples eliminaciones
      act(() => {
        result.current.addProject(mockProject);
      });

      expect(() => {
        act(() => {
          result.current.removeProject();
          result.current.removeProject();
          result.current.removeProject();
        });
      }).not.toThrow();

      expect(result.current.project).toBeUndefined();
    });
  });
});