import React, { useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import { AnimatePresence } from 'framer-motion'

import { fetchMovieSearchResults } from '../../api/utils'

import useHideWhenClickedOutside from '../../hooks/useHideWhenClickedOutside'
import useWindowInnerHeight from '../../hooks/useWindowInnerHeight'

import ResultsModal from './ResultsModal'
import SearchBarInput from './SearchBarInput'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { isResultsModalVisible } from './resultsModalSharedState'

const Container = tw.div`
  mx-auto
  w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
  text-center
`

function SearchBar() {
  const [inputText, setInputText] = useState('')
  const [isModalVisible, setIsModalVisible] = useRecoilState(isResultsModalVisible)
  const [modalMaxHeight, setModalMaxHeight] = useState(1000)
  const windowInnerHeight = useWindowInnerHeight()
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [enableFetch, setEnableFetch] = useState(false)

  const { isLoading, data } = useQuery(
    encodeURI(inputText),
    () => fetchMovieSearchResults(inputText),
    { enabled: enableFetch }
  )

  useHideWhenClickedOutside(searchBarRef, setIsModalVisible)

  useEffect(() => {
    if (searchBarRef.current) {
      setModalMaxHeight(windowInnerHeight - searchBarRef.current.offsetHeight)
    }
  }, [searchBarRef, windowInnerHeight])

  useEffect(() => {
    if (data && inputText) {
      setIsModalVisible(true)
    }
  }, [data, setIsModalVisible, inputText])

  return (
    <Container ref={searchBarRef}>
      <SearchBarInput
        inputText={inputText}
        setEnableFetch={setEnableFetch}
        setInputText={setInputText}
        isLoading={isLoading}
      />
      <AnimatePresence>
        {isModalVisible && data && (
          <ResultsModal
            maxHeight={modalMaxHeight}
            setSearchBarInputText={setInputText}
            searchBarInputText={inputText}
            results={data}
          />
        )}
      </AnimatePresence>
    </Container>
  )
}

export default SearchBar
