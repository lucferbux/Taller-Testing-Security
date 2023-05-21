import { useState, useCallback } from 'react';
import { ProjectResponse } from '../api/api-client';

type UpdateResult<T> = {
  createOrUpdate: (data: T, errorMessage?: string) => Promise<void>;
  status: Status;
  error: Error | undefined;
};

type Status = 'success' | 'loading' | undefined;

export function useCreateOrUpdate<T>(
  createOrUpdateFunction: (data: T) => Promise<ProjectResponse>
): UpdateResult<T> {
  const [status, setStatus] = useState<Status>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const createOrUpdate = useCallback(
    async (data: T, errorMessage?: string) => {
      if (errorMessage) {
        setError(new Error(errorMessage));
        return;
      }
      setStatus('loading');
      try {
        await createOrUpdateFunction(data);
        setStatus('success');
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Unknown error'));
        }
        setStatus(undefined);
      }
    },
    [createOrUpdateFunction]
  );

  return { createOrUpdate, status, error };
}
