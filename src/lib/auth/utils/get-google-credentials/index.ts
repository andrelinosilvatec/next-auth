import server from '@/lib/env/server'

export function getGoogleCredentials() {
  const clientId = server.GOOGLE_CLIENT_ID || ''
  const clientSecret = server.GOOGLE_CLIENT_SECRET || ''

  if (!clientId || clientId.length === 0) {
    console.error(`Missing GOOGLE CLIENT ID ENV`)
  }

  if (!clientSecret || clientSecret.length === 0) {
    console.error('Missing GOOGLE CLIENT SECRET ENV')
  }

  return { clientId, clientSecret }
}
