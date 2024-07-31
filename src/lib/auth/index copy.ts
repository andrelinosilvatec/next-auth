/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '../prisma'
import { sendVerificationRequest } from './email'
import { getEmailCredentials } from './utils/get-email-credentials'
import { getGoogleCredentials } from './utils/get-google-credentials'

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
      from: getEmailCredentials().emailFrom,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
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

  secret: process.env.NEXTAUTH_SECRET,
}
