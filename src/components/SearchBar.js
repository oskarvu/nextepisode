import React, { useState } from 'react'
import tw from 'twin.macro'

const StyledInput = tw.input`
  w-4/6 h-12
  px-8 pb-1 my-4
  rounded-full outline-none bg-gray-200
  text-gray-600 placeholder-gray-200
  text-gray-600 placeholder-gray-400 text-center leading-6 text-xl font-bold uppercase tracking-wider
`

async function fetchMovies(apiQuery) {
  const response = await fetch(apiQuery)
  return await response.json()
}

function SearchBar({ setResults, timeout }) {
  const apiKey = process.env.REACT_APP_API_KEY
  const apiBaseURL = 'https://api.themoviedb.org'
  const [timeoutID, setTimeoutID] = useState(0)
  const [inputText, setInputText] = useState('')
  const [lastKeypressTime, setLastKeypressTime] = useState(0)

  const handleChange = (event) => {
    setInputText(event.target.value)
    const uriEncodedInput = encodeURI(event.target.value)
    const timeBetweenInputs = event.timeStamp - lastKeypressTime
    setLastKeypressTime(event.timeStamp)
    const apiQuery = `${apiBaseURL}/3/search/tv?api_key=${apiKey}&language=en-US&query=${uriEncodedInput}`

    if (timeBetweenInputs < timeout && typeof timeoutID !== 'undefined') {
      window.clearTimeout(timeoutID)
    }

    if (!event.target.value) {
      setResults({ results: [] })
      return
    }

    const nextTimeoutID = window.setTimeout(async () => {
      setResults(await fetchMovies(apiQuery))
    }, timeout)
    setTimeoutID(nextTimeoutID)
  }

  return <StyledInput value={inputText} onChange={handleChange} />
}

export default SearchBar
