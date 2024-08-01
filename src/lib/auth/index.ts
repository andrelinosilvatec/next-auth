/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '../prisma'
import { sendVerificationRequest } from './email'
import { getGoogleCredentials } from './utils/get-google-credentials'
import { getResendCredentials } from './utils/get-resend-credentials'

function assignIfDefined(obj: any, prop: string, value: any) {
  const newObj = { ...obj }
  if (newObj[prop]) {
    newObj[prop] = value
  }
  return newObj
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),

    Email({
      server: '',
      from: getResendCredentials().emailFrom,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (account?.provider === 'email') {
    //     // Generate magic link for email logins
    //     return await sendVerificationRequest({
    //       provider: { id: 'email', name: 'Email' },
    //     })
    //   }
    //   return false
    // },

    // async signIn({
    //   user,
    //   account,
    //   profile,
    //   email,
    //   credentials,
    // }: {
    //   user: User | AdapterUser
    //   account: Account | null
    //   profile?: Profile | undefined
    //   email?: { verificationRequest?: boolean | undefined } | undefined
    //   credentials?: Record<string, any> | undefined
    // }): Promise<string | boolean> {
    //   if (email) {
    //     const identifier = email.verificationRequest
    //       ? 'your_verification_identifier'
    //       : 'your_default_identifier'
    //     // Substitua 'your_verification_identifier' e 'your_default_identifier' pelos valores apropriados
    //     return await sendVerificationRequest({
    //       identifier,
    //       url: process.env.NEXTAUTH_URL || '',
    //       provider: { id: 'email', name: 'Email' },
    //       theme: {
    //         // Customize colors, brand name, etc
    //       },
    //     })
    //   } else {
    //     return false // Retorno explícito de false quando não há e-mail
    //   }
    // },

    async session({ token, session, user }) {
      const newSession = { ...session }
      if (token) {
        if (newSession?.user) {
          newSession.user = assignIfDefined(
            newSession.user,
            'id',
            token.id || '',
          )
          newSession.user = assignIfDefined(
            newSession.user,
            'role',
            token.role || 'USER',
          )
          newSession.user = assignIfDefined(
            newSession.user,
            'emailVerified',
            token.emailVerified || 'USER',
          )
          newSession.user.name = token.name || ''
          newSession.user.email = token.email || ''
          newSession.user.image = token.picture || ''
        }
      }

      const data = { ...newSession, token, user }

      return data
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '', // Hex color code
  },

  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,
}
