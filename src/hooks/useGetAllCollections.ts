import {BASE_URL} from '@app/constants/url';
import {useState, useEffect} from 'react';

// Define TypeScript interfaces for the response data
interface Collection {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  handle: string;
  metadata: Record<string, unknown>; // Replace with a more specific type if possible
}

interface CollectionsResponse {
  collections: Collection[];
  count: number;
  limit: number;
  offset: number;
}

// Interface for the hook's return type
interface UseGetAllCollectionsReturn {
  data: CollectionsResponse | null;
  loading: boolean;
  error: Error | null;
}

// The hook itself
function useGetAllCollections(): UseGetAllCollectionsReturn {
  const [data, setData] = useState<CollectionsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch(`${BASE_URL}/store/collections`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const collectionsData: CollectionsResponse = await response.json();
        setData(collectionsData);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(e.toString()));
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return {data, loading, error};
}

export default useGetAllCollections;
