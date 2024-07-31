'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode, useEffect, useState } from 'react'

interface ProviderNextAuthProps {
  children: ReactNode
}

export const ProviderNextAuth = ({ children }: ProviderNextAuthProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <div />
  }

  return <SessionProvider>{children}</SessionProvider>
}
