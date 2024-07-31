import { AuthenticationMagicLinkTemplate } from '@/templates/emails/authentication-magic-link.template'

import { resend } from '../emails/resend'
import server from '../env/server'

interface SendVerificationRequestParams {
  identifier: string
  url: string
  provider: any
  theme: any
}

export async function sendVerificationRequest({
  identifier: email,
  url,
  provider,
  theme,
}: SendVerificationRequestParams): Promise<void> {
  const { host } = new URL(url)

  try {
    await resend.emails.send({
      from: `Site Aplicação <${server.RESEND_FROM}>`,
      to: [email],
      subject: `[Site Aplicação] Link para login em ${host}`,
      text: text({ url, host }),
      react: AuthenticationMagicLinkTemplate({
        userEmail: email,
        authLink: url,
      }) as React.ReactElement,
    })
  } catch (error) {}
}

function text({ url, host }: { url: string; host: string }) {
  return `Login em ${host}\n${url}\n\n`
}
