import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getProviders } from 'next-auth/react'

import { authOptions } from '@/lib/auth'

import { ButtonProvider } from './components/button-provider'
import { FormEmailProvider } from './components/form-email-provider'

export default async function SignIn() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  const providers = await getProviders()

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex w-full max-w-xs p-4">
            {provider.id !== 'email' ? (
              <ButtonProvider key={provider.id} provider={provider} />
            ) : (
              <FormEmailProvider />
            )}
          </div>
        ))}
    </div>
  )
}
