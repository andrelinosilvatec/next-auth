import server from '@/lib/env/server'

export function getFacebookCredentials() {
  const clientId = server.FACEBOOK_CLIENT_ID || ''
  const clientSecret = server.FACEBOOK_CLIENT_SECRET || ''

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing FACEBOOK CLIENT ID ENV')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing FACEBOOK CLIENT SECRET ENV')
  }

  return { clientId, clientSecret }
}
