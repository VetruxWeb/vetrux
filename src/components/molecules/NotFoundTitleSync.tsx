'use client'

import { useEffect } from 'react'

const notFoundTitle = 'Page not found — Vetrux CBD'

/** Keep the tab title accurate when Next renders not-found.tsx after a client navigation. */
export default function NotFoundTitleSync() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = notFoundTitle

    return () => {
      if (document.title === notFoundTitle) document.title = previousTitle
    }
  }, [])

  return null
}
