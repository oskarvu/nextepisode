import React, { useState } from 'react'
import tw from 'twin.macro'

import Header from './Header'
import MoviesList from './MoviesList'
import Footer from './Footer'

const MainContainer = tw.div`
  bg-gray-200 h-screen
`

function Main() {
  const [movies, setMovies] = useState([])
  return (
    <MainContainer>
      <Header movies={movies} setMovies={setMovies} />
      <MoviesList movies={movies} setMovies={setMovies} />
      <Footer />
    </MainContainer>
  )
}

export default Main
