import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'duoy0d82',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})