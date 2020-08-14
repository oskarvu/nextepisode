import React, { useState } from 'react'
import tw from 'twin.macro'

const StyledInput = tw.input`
  w-4/6 h-12
  px-8 pb-1 my-4
  rounded-full outline-none bg-gray-200
  text-gray-600 placeholder-gray-200
  text-gray-600 placeholder-gray-400 text-center leading-6 text-xl font-bold uppercase tracking-wider
`

function getQueryText(inputText) {
  const apiKey = process.env.REACT_APP_API_KEY
  const apiBaseURL = process.env.REACT_APP_API_BASE_SEARCH_URL
  const uriEncodedInput = encodeURI(inputText)
  return `${apiBaseURL}tv?api_key=${apiKey}&language=en-US&query=${uriEncodedInput}`
}

async function fetchMovies(apiQuery) {
  const response = await fetch(apiQuery)
  const data = await response.json()
  return data.results
}

function SearchBar({ setResults, timeout }) {
  const [inputText, setInputText] = useState('')
  const [timeoutID, setTimeoutID] = useState(0)
  const [lastKeypressTime, setLastKeypressTime] = useState(0)

  const handleChange = (event) => {
    setInputText(event.target.value)

    const timeBetweenInputs = event.timeStamp - lastKeypressTime
    setLastKeypressTime(event.timeStamp)
    if (timeBetweenInputs < timeout && timeoutID) {
      window.clearTimeout(timeoutID)
    }
    // set results to empty array if no text in input, because of return
    // should be after clearing timeout, if for example fast backspace
    if (!event.target.value) {
      setResults([])
      return
    }
    //set timeout at the end of handler, so after every input new one starts
    const nextTimeoutID = window.setTimeout(async () => {
      const queryText = getQueryText(event.target.value)
      setResults(await fetchMovies(queryText))
    }, timeout)
    setTimeoutID(nextTimeoutID)
  }

  return <StyledInput value={inputText} onChange={handleChange} />
}

export default SearchBar
