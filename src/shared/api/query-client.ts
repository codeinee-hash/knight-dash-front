import { QueryClient } from '@tanstack/query-core'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
