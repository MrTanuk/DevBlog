import { useState, useEffect } from 'react';

interface UseJikanResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJikan<T>(endpoint: string): UseJikanResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.jikan.moe/v4${endpoint}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const json = await response.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled && !(err instanceof DOMException && err.name === 'AbortError')) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [endpoint, refetchIndex]);

  const refetch = () => setRefetchIndex((i) => i + 1);

  return { data, loading, error, refetch };
}
