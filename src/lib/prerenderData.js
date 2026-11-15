import { createContext, useContext } from 'react'

// Sanity data fetched at build time for the page being prerendered:
// { posts } on the blog list, { post } on a post. Null in the browser when
// the page was not prerendered.
const PrerenderDataContext = createContext(null)

export const PrerenderDataProvider = PrerenderDataContext.Provider
export const usePrerenderData = () => useContext(PrerenderDataContext)
