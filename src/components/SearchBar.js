import React, { useEffect, useState } from 'react'
import tw, { theme } from 'twin.macro'

import ResultsModal from './ResultsModal'
import apiConfig from '../api/config'

const Container = tw.div`
  w-4/6
  text-center
`

const Input = tw.input`
  w-95 h-12
  px-8 pb-1 my-4
  rounded-full outline-none bg-gray-200
  text-gray-600 placeholder-gray-200
  leading-6 text-xl font-bold uppercase tracking-wider
`

function getQueryText(inputText) {
  const uriEncodedInput = encodeURI(inputText)
  return `${apiConfig.searchURL}tv?api_key=${apiConfig.key}&language=en-US&query=${uriEncodedInput}`
}

async function fetchMovies(apiQuery) {
  try {
    const response = await fetch(apiQuery)
    const data = await response.json()
    return data.results
  } catch (e) {
    console.error(e)
    return []
  }
}

function SearchBar() {
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
      <ResultsModal results={results} />
    </Container>
  )
}

export default SearchBar
