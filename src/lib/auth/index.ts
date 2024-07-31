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
    // => Restringe o acesso apenas para contas Google verificadas
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (
    //     account?.provider === 'google' &&
    //     profile?.email_verified &&
    //     profile?.email?.endsWith('@gmail.com')
    //   ) {
    //     return true
    //   }

    //   return false
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
  },

  secret: process.env.NEXTAUTH_SECRET,
}
