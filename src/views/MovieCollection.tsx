import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MovieTile } from '../components/MovieTile/MovieTile'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { movieFilteredIds, movieIds, toStoreMovieInitState } from './movieCollectionState'
import { movieInitState } from '../components/MovieTile/movieSharedState'

const List = tw(motion.ul)`
  flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

export default function MovieCollection() {
  const ids = useRecoilValue(movieIds)
  const filteredIds = useRecoilValue(movieFilteredIds)
  const movieInitData = useRecoilValue(toStoreMovieInitState)

  const restoreInitData = useRecoilCallback(({ snapshot, set }) => {
    return async () => {
      const storedInitState = await snapshot.getPromise(toStoreMovieInitState)
      Object.keys(storedInitState).forEach((key) => {
        const keyAsNum = Number.parseInt(key)
        set(movieInitState(keyAsNum), (prevState) => ({
          ...prevState,
          ...storedInitState[keyAsNum],
        }))
      })
    }
  }, [])

  useEffect(() => {
    restoreInitData()
  }, [restoreInitData])

  useEffect(() => {
    localStorage.setItem('storage', JSON.stringify({ ids, filteredIds, movieInitData }))
  }, [ids, filteredIds, movieInitData])

  return (
    <List>
      <AnimateSharedLayout>
        <AnimatePresence>
          {ids.map((id) => {
            // setIteratedMovie(id)
            // console.log(iteratedMovie.name)
            return <MovieTile key={id} movieId={id} />
          })}
        </AnimatePresence>
      </AnimateSharedLayout>
    </List>
  )
}
