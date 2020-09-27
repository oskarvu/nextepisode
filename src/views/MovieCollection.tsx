import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MovieTile } from '../components/MovieTile/MovieTile'
import { useRecoilValue } from 'recoil'
import { FiltersModal } from '../components/FiltersModal/FiltersModal'
import { LocalStorage } from '../db/types'
import { firstRenderSortedIds, idMovieInitDataRecord } from './movieCollectionState'

const List = tw(motion.ul)`
  relative flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

export default function MovieCollection() {
  const idMovieRecord = useRecoilValue(idMovieInitDataRecord)
  const firstRenderIds = useRecoilValue(firstRenderSortedIds)

  useEffect(() => {
    localStorage.setItem(LocalStorage.idMovieInitDataRecord, JSON.stringify(idMovieRecord))
  }, [idMovieRecord])

  return (
    <List>
      <AnimateSharedLayout>
        <AnimatePresence>
          {firstRenderIds.map((id) => (
            <MovieTile key={id} movieId={id} />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
      <FiltersModal />
    </List>
  )
}
