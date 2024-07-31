import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getCsrfToken, getProviders } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authOptions } from '@/lib/auth'

import { ButtonProvider } from './components/button-provider'

export default async function SignIn() {
  const session = await getServerSession(authOptions)
  const csrfToken = await getCsrfToken()

  if (session) {
    redirect('/')
  }

  const providers = await getProviders()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 ">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex w-full max-w-xs p-4">
            {provider.id !== 'email' ? (
              <ButtonProvider key={provider.id} provider={provider} />
            ) : (
              <form
                method="post"
                action="/api/auth/signin/email"
                className="flex w-full flex-col gap-4 "
              >
                <Input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <Label className="flex flex-col">
                  Email address
                  <Input type="email" id="email" name="email" />
                </Label>
                <Button type="submit">Acessar com e-mail</Button>
              </form>
            )}
          </div>
        ))}
    </div>
  )
}
