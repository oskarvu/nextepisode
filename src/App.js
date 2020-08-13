import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import 'tailwindcss/dist/base.min.css'

const Input = styled.input(() => [
  tw`w-4/6 h-12`,
  tw`px-8 pb-1 my-4`,
  tw`rounded-full outline-none bg-gray-200`,
  tw`text-gray-600 placeholder-gray-300 text-center leading-6 text-xl font-bold uppercase tracking-wider`,
])

// const Input = tw.input`w-4/6 h-12 px-8 pb-1 my-4 rounded-full bg-gray-200 text-gray-600 text-center leading-6 text-xl font-bold uppercase tracking-wider outline-none placeholder-gray-300`

async function fetchMovies(apiQuery) {
  const response = await fetch(apiQuery)
  return await response.json()
}

function SearchBar({ setMovies, timeout }) {
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
      setMovies({ results: [] })
      return
    }

    const nextTimeoutID = window.setTimeout(async () => {
      setMovies(await fetchMovies(apiQuery))
    }, timeout)
    setTimeoutID(nextTimeoutID)
  }

  return <Input value={inputText} onChange={handleChange} />
}

function App() {
  const [movies, setMovies] = useState({ results: [] })
  return (
    <div tw="bg-gray-200 h-screen">
      <div tw="flex items-baseline bg-white">
        <span tw="w-1/6">logo</span>
        <SearchBar setMovies={setMovies} timeout={200} />
        <span tw="w-1/6">theme</span>
      </div>
      <div>
        {/*{movies.results.length}*/}
        <ul tw="list-disc">
          {movies.results.map((movie) => (
            <li key={movie.id}>{movie.original_name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
