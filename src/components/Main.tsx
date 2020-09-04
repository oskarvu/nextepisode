import React, { useState, createContext, useEffect } from 'react'
import tw from 'twin.macro'

import Header from './Header'
import MoviesList from './MoviesList'
import Footer from './Footer'

const MainContainer = tw.div`
  min-h-screen
  bg-gray-200
`

export interface MoviesIdsContextShape {
  moviesIds: number[]
  setMoviesIds: React.Dispatch<React.SetStateAction<number[]>>
}

export const MoviesIdsContext = createContext<MoviesIdsContextShape>({
  moviesIds: [],
  setMoviesIds: () => {},
})

// todo: add error handling (api)
export default function Main() {
  const localData = localStorage.getItem('moviesIds')
  const initialMoviesIds = () =>
    localData ? (JSON.parse(localData) as number[]) : ([] as number[])
  const [moviesIds, setMoviesIds] = useState(initialMoviesIds)

  useEffect(() => {
    localStorage.setItem('moviesIds', JSON.stringify(moviesIds))
  }, [moviesIds])

  return (
    <MainContainer>
      <MoviesIdsContext.Provider value={{ moviesIds, setMoviesIds }}>
        <Header />
        <MoviesList />
      </MoviesIdsContext.Provider>
      <Footer />
    </MainContainer>
  )
}
