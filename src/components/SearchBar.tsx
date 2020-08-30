import React, { useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'

import { SearchResult } from '../api/types'

import ResultsModal from './ResultsModal'
import SearchBarInput from './SearchBarInput'
import useHideWhenClickedOutside from '../hooks/useHideWhenClickedOutside'
import useWindowInnerHeight from '../hooks/useWindowInnerHeight'

const Container = tw.div`
  mx-auto
  w-full md:w-10/12 lg:w-9/12 xl:w-8/12 xxl:w-6/12
  text-center
`

function SearchBar() {
  const [results, setResults] = useState([] as SearchResult[])
  const [inputText, setInputText] = useState('')
  const [modalVisible, setModalVisible] = useState(true)
  const [modalMaxHeight, setModalMaxHeight] = useState(1000)
  const windowInnerHeight = useWindowInnerHeight()
  const searchBarRef = useRef<HTMLDivElement>(null)

  useHideWhenClickedOutside(searchBarRef, setModalVisible)

  useEffect(() => {
    if (searchBarRef.current) {
      setModalMaxHeight(windowInnerHeight - searchBarRef.current.offsetHeight)
    }
  }, [searchBarRef, windowInnerHeight])

  return (
    <Container ref={searchBarRef}>
      <SearchBarInput
        inputText={inputText}
        setInputText={setInputText}
        setModalVisible={setModalVisible}
        setResults={setResults}
      />
      <ResultsModal
        maxHeight={modalMaxHeight}
        visible={modalVisible}
        setVisible={setModalVisible}
        setSearchBarInputText={setInputText}
        results={results}
      />
    </Container>
  )
}

export default SearchBar
