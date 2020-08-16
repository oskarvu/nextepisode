import React, { useState, createContext } from 'react'
import tw from 'twin.macro'

import Header from './Header'
import MoviesList from './MoviesList'
import Footer from './Footer'

const MainContainer = tw.div`
  bg-gray-200 h-screen
`

const MoviesContext = createContext([])

function Main() {
  //TODO: use context for movies
  const [movies, setMovies] = useState([])
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
