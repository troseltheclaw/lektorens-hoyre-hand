import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is fresh for 1 hour by default
        staleTime: 60 * 60 * 1000,
        // Keep unused data in cache/storage for 7 days
        gcTime: 1000 * 60 * 60 * 24 * 7,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
