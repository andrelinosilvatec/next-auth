import axios from 'axios'

export function setupAPIClient() {
  const api = axios.create({
    baseURL: process.env.BASE_URL || '',
  })

  return api
}

export const api = setupAPIClient()
