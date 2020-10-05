import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { SearchBar } from './SearchBar'

const TopContainer = styled.div(({ isScrolled }: { isScrolled: boolean }) => [
  tw`sticky top-0 z-10
  flex justify-center
  w-full
  bg-white shadow-none transition-shadow duration-300`,
  isScrolled && tw`shadow-lg`,
])

export function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleFirstDownScroll() {
      setIsScrolled(true)
      window.removeEventListener('scroll', handleFirstDownScroll)
    }

    function handleScrollToTop() {
      if (window.pageYOffset === 0) {
        window.pageYOffset === 0 && setIsScrolled(false)
        window.addEventListener('scroll', handleFirstDownScroll)
      }
    }

    window.addEventListener('scroll', handleFirstDownScroll)
    window.addEventListener('scroll', handleScrollToTop)
    return () => {
      window.removeEventListener('scroll', handleFirstDownScroll)
      window.removeEventListener('scroll', handleScrollToTop)
    }
  }, [])

  return (
    <TopContainer isScrolled={isScrolled}>
      <SearchBar />
    </TopContainer>
  )
}
