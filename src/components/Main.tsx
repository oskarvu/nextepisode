import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { atom, useRecoilValue } from 'recoil'

import TopBar from '../views/TopBar'
import MovieCollection from '../views/MovieCollection'
import Footer from '../views/Footer'

const MainContainer = tw.div`
  min-h-screen
  bg-gray-200
`

// enum Filters {
//   Studio,
//   AirTime,
//   AddTime,
// }

export interface MovieShortData {
  id: number
  name: string
  addTime: number
  timeLeftToAir: number | null
  studio: string | null
}

export interface IdMovieShortDataMap {
  [id: number]: MovieShortData
}

const stored = localStorage.getItem('storage')

export const idMovieShortDataMap = atom<IdMovieShortDataMap>({
  key: 'idMovieShortDataMap',
  default: stored
    ? (JSON.parse(stored).moviesData as MovieShortData[])
    : ([] as MovieShortData[]),
})

export const movieIdList = atom<number[]>({
  key: 'movieIdList',
  default: stored
    ? (JSON.parse(stored).moviesIds as number[])
    : ([] as number[]),
})

// todo: add error handling (api)
export default function Main() {
  const moviesData = useRecoilValue(idMovieShortDataMap)
  const moviesIds = useRecoilValue(movieIdList)

  useEffect(() => {
    const toStore = { moviesData, moviesIds }
    localStorage.setItem('storage', JSON.stringify(toStore))
  }, [moviesData, moviesIds])

  return (
    <MainContainer>
      <TopBar />
      <MovieCollection />
      <Footer />
    </MainContainer>
  )
}
