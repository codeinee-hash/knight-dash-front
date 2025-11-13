'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ComposeChildren } from '@/shared/lib/react'
import { queryClient } from '@/shared/api/query-client'
import { Toaster } from 'sonner'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ComposeChildren>
        <QueryClientProvider client={queryClient} />
        {children}
      </ComposeChildren>
      <Toaster richColors position='top-right' />
    </>
  )
}
