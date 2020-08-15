import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'

import ResultsModal from './ResultsModal'
import apiConfig from '../api/config'
import { getQueryText, fetchMovies } from '../utils/api'

const Container = tw.div`
  w-4/6
  text-center
`

const Input = tw.input`
  w-95 h-12
  px-6 pb-1 my-4
  rounded-full outline-none bg-gray-200
  text-gray-600 placeholder-gray-200
  leading-6 text-lg font-bold uppercase tracking-wide
`

function SearchBar({ setMovies }) {
  const [results, setResults] = useState([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      if (!inputText) {
        setResults([])
        return
      }
      const queryText = getQueryText(inputText)
      fetchMovies(queryText).then((movies) => {
        setResults(movies)
      })
    }, apiConfig.fetchDelay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [inputText])

  return (
    <Container>
      <Input
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />
      <ResultsModal results={results} setMovies={setMovies} />
    </Container>
  )
}

export default SearchBar
