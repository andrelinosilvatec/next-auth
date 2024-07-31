import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getCsrfToken, getProviders } from 'next-auth/react'

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
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {provider.id !== 'email' ? (
              <ButtonProvider key={provider.id} provider={provider} />
            ) : (
              <form method="post" action="/api/auth/signin/email">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <label>
                  Email address
                  <input type="email" id="email" name="email" />
                </label>
                <button type="submit">Sign in with Email</button>
              </form>
            )}
          </div>
        ))}
    </>
  )
}
