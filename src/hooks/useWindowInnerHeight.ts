import { useState, useEffect } from 'react'

export function useWindowInnerHeight() {
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)

  function handleResize() {
    setWindowInnerHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowInnerHeight
}
