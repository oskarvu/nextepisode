import React, { useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'

import { SearchResult } from '../api/types'

import ResultsModal from './ResultsModal'
import SearchBarInput from './SearchBarInput'
import useHideWhenClickedOutside from '../hooks/useHideWhenClickedOutside'
import useWindowInnerHeight from '../hooks/useWindowInnerHeight'
import { AnimatePresence } from 'framer-motion'

const Container = tw.div`
  mx-auto
  w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
  text-center
`

function SearchBar() {
  const [results, setResults] = useState([] as SearchResult[])
  const [inputText, setInputText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
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
      <AnimatePresence>
        {modalVisible && (
          <ResultsModal
            maxHeight={modalMaxHeight}
            setVisible={setModalVisible}
            setSearchBarInputText={setInputText}
            results={results}
          />
        )}
      </AnimatePresence>
    </Container>
  )
}

export default SearchBar
