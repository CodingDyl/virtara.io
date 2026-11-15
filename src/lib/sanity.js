import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'h9swrh5t', // you can find this in sanity.config.js
  dataset: 'production', // or the name you chose for your dataset
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-20', // use current date in YYYY-MM-DD format
});

// Shared by the blog pages and the build-time prerender.
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  publishedAt,
  // The three 2024 posts were copied into this project on 11 Nov 2026; that
  // copy is not an edit, so they report their publish date as last modified.
  "_updatedAt": select(_updatedAt == "2026-11-11T15:54:12Z" => publishedAt, _updatedAt),
  excerpt,
  readTime,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  "author": author->name,
  "categories": categories[]->title
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  // The three 2024 posts were copied into this project on 11 Nov 2026; that
  // copy is not an edit, so they report their publish date as last modified.
  "_updatedAt": select(_updatedAt == "2026-11-11T15:54:12Z" => publishedAt, _updatedAt),
  excerpt,
  body,
  readTime,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  "author": author->name,
  "categories": categories[]->title
}`;
