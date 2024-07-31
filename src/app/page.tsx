import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

import { ButtonSignIn } from '@/components/auth/sign-in'
import { ButtonSignOut } from '@/components/auth/sign-out'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
        {session?.user.id ? <ButtonSignOut /> : <ButtonSignIn />}

        <pre>{session && JSON.stringify(session, null, 2)}</pre>
      </main>
    </Suspense>
  )
}
