import React from 'react'
import tw from 'twin.macro'

import SearchBar from './SearchBar'

const StyledHeader = tw.header`
  flex items-baseline
  bg-white
`

function Header({ setMovies }) {
  return (
    <StyledHeader>
      <span tw="w-1/6">logo</span>
      <SearchBar setMovies={setMovies} />
      <span tw="w-1/6">theme</span>
    </StyledHeader>
  )
}

export default Header
