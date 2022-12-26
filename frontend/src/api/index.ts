import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from "@backend/server"

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/trpc'
    })
  ]
})

