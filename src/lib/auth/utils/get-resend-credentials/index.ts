export function getResendCredentials() {
  const emailServer = process.env.RESEND_SERVER || ''
  const emailFrom = process.env.RESEND_FROM || ''

  if (!emailServer || emailServer.length === 0) {
    console.error(`Missing RESEND_SERVER`)
  }

  if (!emailFrom || emailFrom.length === 0) {
    console.error('Missing RESEND_FROM')
  }

  return { emailServer, emailFrom }
}
