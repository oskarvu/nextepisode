import React, { useState } from 'react'
import tw from 'twin.macro'

import SearchBar from './SearchBar'
import ResultsModal from './ResultsModal'

const StyledHeader = tw.header`
  flex items-baseline
  bg-white
`

function Header() {
  const [results, setResults] = useState([])

  return (
    <StyledHeader>
      <span tw="w-1/6">logo</span>
      <SearchBar setResults={setResults} timeout={200} />
      <span tw="w-1/6">theme</span>
      <ResultsModal results={results} />
    </StyledHeader>
  )
}

export default Header
