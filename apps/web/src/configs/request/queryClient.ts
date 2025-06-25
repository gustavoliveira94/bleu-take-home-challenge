import { isServer, QueryClient } from '@tanstack/react-query';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 2 * 1000,
      },
    },
  });

export const createQueryClient = () => {
  return makeQueryClient();
};
