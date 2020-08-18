import React, { useRef, useState } from 'react'
import tw from 'twin.macro'

import ResultsModal from './ResultsModal'
import SearchBarInput from './SearchBarInput'
import useHideWhenClickedOutside from '../hooks/useHideWhenClickedOutside'

const Container = tw.div`
  w-4/6
  text-center
`

function SearchBar() {
  const [results, setResults] = useState([])
  const [inputText, setInputText] = useState('')
  const [modalVisible, setModalVisible] = useState(true)
  const searchBarRef = useRef(null)

  useHideWhenClickedOutside(searchBarRef, setModalVisible)

  return (
    <Container ref={searchBarRef}>
      <SearchBarInput
        inputText={inputText}
        setInputText={setInputText}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setResults={setResults}
      />
      <ResultsModal
        visible={modalVisible}
        setVisible={setModalVisible}
        setSearchBarInputText={setInputText}
        results={results}
      />
    </Container>
  )
}

export default SearchBar
