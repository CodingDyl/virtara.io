import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'your-project-id', // you can find this in sanity.config.js
  dataset: 'production', // or the name you chose for your dataset
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-20', // use current date in YYYY-MM-DD format
}); 