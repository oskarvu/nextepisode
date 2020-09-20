import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import MovieTile from '../components/MovieTile/MovieTile'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  iteratedMovieFilterDataId,
  movieIdListWithoutDuplicates,
  selectIteratedMovieFilterData,
} from './movieCollectionState'

const List = tw(motion.ul)`
  flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

export default function MovieCollection() {
  const setIteratedMovie = useSetRecoilState(iteratedMovieFilterDataId)
  const iteratedMovie = useRecoilValue(selectIteratedMovieFilterData)
  const moviesIds = useRecoilValue(movieIdListWithoutDuplicates)

  // useEffect(() => {
  //   const toStore = { moviesData, moviesIds }
  //   localStorage.setItem('storage', JSON.stringify(toStore))
  // }, [moviesData, moviesIds])

  useEffect(() => {
    console.log(moviesIds)
  }, [moviesIds])

  return (
    <List>
      <AnimateSharedLayout>
        <AnimatePresence>
          {moviesIds.map((id) => {
            // setIteratedMovie(id)
            // console.log(iteratedMovie.name)
            return <MovieTile key={id} movieId={id} />
          })}
        </AnimatePresence>
      </AnimateSharedLayout>
    </List>
  )
}
