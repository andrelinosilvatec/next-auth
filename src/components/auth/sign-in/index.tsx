'use client'

import { User } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export function ButtonSignIn() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <div />
  }

  return (
    <Button className="flex gap-2 font-semibold" onClick={() => signIn()}>
      ENTRAR
      <User fontWeight="thin" />
    </Button>
  )
}
