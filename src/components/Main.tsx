import React, { useState, createContext, useEffect } from 'react'
import tw from 'twin.macro'
import { atom, atomFamily, RecoilRoot } from 'recoil'

import Header from './Header'
import MoviesList from './MoviesList'
import Footer from './Footer'

const MainContainer = tw.div`
  min-h-screen
  bg-gray-200
`

enum Filters {
  Studio,
  AirTime,
  AddTime,
}

interface MovieShortData {
  id: number | null
  addTime: number | null
  timeLeftToAir: number | null
  studio: string | null
}

// export interface idAtom {
//   [id: number]: IdMovieFilteringData
// }

const localData = localStorage.getItem('moviesShortData')
export const movieList = atom<MovieShortData[]>({
  key: 'movieAtoms',
  default: localData
    ? (JSON.parse(localData) as MovieShortData[])
    : ([] as MovieShortData[]),
})

// todo: add error handling (api)
export default function Main() {
  const localData = localStorage.getItem('moviesIds')
  const initialMoviesIds = () =>
    localData
      ? (JSON.parse(localData) as MovieShortData[])
      : ([] as MovieShortData[])
  const [moviesIds, setMoviesIds] = useState(initialMoviesIds)

  useEffect(() => {
    localStorage.setItem('moviesIds', JSON.stringify(moviesIds))
  }, [moviesIds])

  return (
    <MainContainer>
      <RecoilRoot>
        <Header />
        <MoviesList />
      </RecoilRoot>
      <Footer />
    </MainContainer>
  )
}
