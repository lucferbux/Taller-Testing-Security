import { renderHook, waitFor, act } from '@testing-library/react';
import useFetchData from '../useFetchData';

// Helpers
const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('useFetchData', () => {
  it('estado inicial: data null, loading true, error null', async () => {
    const fetchFn = jest.fn().mockResolvedValue('fetched');

    const { result } = renderHook(() => useFetchData(fetchFn));

    // Primer render
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    // Esperar a que termine el fetch para no dejar promesas pendientes
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('fetch exitoso: guarda datos, apaga loading, sin error', async () => {
    const fetchFn = jest.fn().mockResolvedValue({ value: 42 });

    const { result } = renderHook(() => useFetchData(fetchFn));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ value: 42 });
    expect(result.current.error).toBeNull();
  });

  it('fetch con error: mantiene data inicial, captura error y apaga loading', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('boom'));

    const { result } = renderHook(() => useFetchData(fetchFn));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe('boom');
  });

  it('refetch: vuelve a llamar fetch y actualiza data', async () => {
    const fetchFn = jest
      .fn()
      .mockResolvedValueOnce({ value: 1 })
      .mockResolvedValueOnce({ value: 2 });

    const { result } = renderHook(() => useFetchData(fetchFn));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual({ value: 1 });
    expect(fetchFn).toHaveBeenCalledTimes(1);

    await act(async () => {
      result.current.reload();
      await flushPromises();
    });

    await waitFor(() => expect(result.current.data).toEqual({ value: 2 }));
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
