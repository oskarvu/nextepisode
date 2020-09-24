import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MovieTile } from '../components/MovieTile/MovieTile'
import { useRecoilValue } from 'recoil'
import { idMovieInitDataMap, movieFilteredIds, movieIds } from './movieCollectionState'
import { FiltersModal } from '../components/FiltersModal'
import { LocalStorage } from '../db/types'

const List = tw(motion.ul)`
  flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

export default function MovieCollection() {
  const ids = useRecoilValue(movieIds)
  const filteredIds = useRecoilValue(movieFilteredIds)

  useEffect(() => {
    localStorage.setItem(LocalStorage.filteredIdArray, JSON.stringify(filteredIds))
    localStorage.setItem(LocalStorage.idArray, JSON.stringify(ids))
    localStorage.setItem(LocalStorage.idMovieInitDataMap, JSON.stringify(idMovieInitDataMap))
  }, [ids, filteredIds])

  return (
    <List>
      <AnimateSharedLayout>
        <AnimatePresence>
          {ids.map((id) => {
            return <MovieTile key={id} movieId={id} />
          })}
        </AnimatePresence>
      </AnimateSharedLayout>
      <FiltersModal />
    </List>
  )
}
