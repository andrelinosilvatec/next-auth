'use client'

import { ClientSafeProvider, signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

interface ButtonProps {
  provider: ClientSafeProvider
}

export function ButtonProvider({ provider }: ButtonProps) {
  return (
    <Button className="w-full" onClick={() => signIn(provider.id)}>
      Acessar com {provider.name}
    </Button>
  )
}
