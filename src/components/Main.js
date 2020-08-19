import React, { useState, createContext, useEffect } from 'react'
import tw from 'twin.macro'

import Header from './Header'
import MoviesList from './MoviesList'
import Footer from './Footer'

const MainContainer = tw.div`
  bg-gray-200 min-h-screen
`
const MoviesContext = createContext([])

function Main() {
  const initialMovies = () => JSON.parse(localStorage.getItem('movies')) || []
  const [movies, setMovies] = useState(initialMovies)

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  return (
    <MainContainer>
      <MoviesContext.Provider value={[movies, setMovies]}>
        <Header />
        <MoviesList />
      </MoviesContext.Provider>
      <Footer />
    </MainContainer>
  )
}

export default Main
export { MoviesContext }
