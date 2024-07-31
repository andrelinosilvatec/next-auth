import { Resend } from 'resend'

import server from '../env/server'

export const resend = new Resend(server.RESEND_API_KEY)
