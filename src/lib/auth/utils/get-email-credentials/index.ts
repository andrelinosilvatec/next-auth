import server from '@/lib/env/server'

export function getEmailCredentials() {
  const emailServer = server.EMAIL_SERVER || ''
  const emailFrom = server.EMAIL_FROM || ''

  if (!emailServer || emailServer.length === 0) {
    console.error(`Missing EMAIL SERVER ENV`)
  }

  if (!emailFrom || emailFrom.length === 0) {
    console.error('Missing EMAIL FROM ENV')
  }

  return { emailServer, emailFrom }
}
