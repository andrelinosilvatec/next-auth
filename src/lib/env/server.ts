import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  NEXT_API_URL: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),

  EMAIL_SERVER: z.string(),
  EMAIL_FROM: z.string(),

  RESEND_API_KEY: z.string(),
  RESEND_SERVER: z.string(),
  RESEND_FROM: z.string(),

  IMGBB_API_KEY: z.string(),

  NEXT_ENABLE_API_DELAY: z
    .string()
    .transform((value) => value === 'true')
    .optional(),
})

export type EnvSchema = z.infer<typeof envSchema>

export default envSchema.parse({
  MODE: process.env.MODE,
  NEXT_API_URL: process.env.NEXT_API_URL,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,

  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_FROM: process.env.EMAIL_FROM,

  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_SERVER: process.env.RESEND_SERVER,
  RESEND_FROM: process.env.RESEND_FROM,

  IMGBB_API_KEY: process.env.IMGBB_API_KEY,

  NEXT_ENABLE_API_DELAY: process.env.NEXT_ENABLE_API_DELAY,
}) as EnvSchema
