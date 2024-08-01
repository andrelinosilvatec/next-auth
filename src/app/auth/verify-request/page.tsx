'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function VerifyRequest() {
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin)
    }
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-800">
      <div className="flex  max-w-sm flex-col gap-6 rounded-lg bg-zinc-950 p-8 text-white">
        <h2 className="text-center text-3xl">Verifique seu e-mail</h2>
        <p className="text-lg">
          Foi enviado um link de acesso para o seu endereço de e-mail.
        </p>
        <Link href={baseUrl} className="text-center hover:text-blue-400">
          {baseUrl}
        </Link>
      </div>
    </div>
  )
}
