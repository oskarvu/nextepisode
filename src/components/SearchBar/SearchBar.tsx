import React, { useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import { AnimatePresence } from 'framer-motion'

import { ApiQueryType, SearchResult } from '../../api/types'
import { fetchDelay } from '../../api/config'
import { parseToSearchResult } from '../../utils/api'

import useHideWhenClickedOutside from '../../hooks/useHideWhenClickedOutside'
import useWindowInnerHeight from '../../hooks/useWindowInnerHeight'
import useTMDBFetch from '../../hooks/useTMDBFetch'

import ResultsModal from './ResultsModal'
import SearchBarInput from './SearchBarInput'

const Container = tw.div`
  mx-auto
  w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
  text-center
`

function SearchBar() {
  const [inputText, setInputText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMaxHeight, setModalMaxHeight] = useState(1000)
  const windowInnerHeight = useWindowInnerHeight()
  const searchBarRef = useRef<HTMLDivElement>(null)

  const { isLoading, data } = useTMDBFetch<SearchResult[]>(
    ApiQueryType.Search,
    inputText,
    parseToSearchResult,
    fetchDelay
  )

  useHideWhenClickedOutside(searchBarRef, setModalVisible)

  useEffect(() => {
    if (searchBarRef.current) {
      setModalMaxHeight(windowInnerHeight - searchBarRef.current.offsetHeight)
    }
  }, [searchBarRef, windowInnerHeight])

  useEffect(() => {
    if (data) {
      setModalVisible(true)
    }
  }, [data])

  return (
    <Container ref={searchBarRef}>
      <SearchBarInput
        inputText={inputText}
        setInputText={setInputText}
        setModalVisible={setModalVisible}
        isLoading={isLoading}
      />
      <AnimatePresence>
        {modalVisible && data && (
          <ResultsModal
            maxHeight={modalMaxHeight}
            setVisible={setModalVisible}
            setSearchBarInputText={setInputText}
            results={data as SearchResult[]}
          />
        )}
      </AnimatePresence>
    </Container>
  )
}

export default SearchBar
