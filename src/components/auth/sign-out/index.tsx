'use client'

import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export function ButtonSignOut() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <div />
  }

  return (
    <Button
      className="flex gap-2 font-semibold"
      variant="destructive"
      onClick={() => signOut()}
    >
      Sair
    </Button>
  )
}
