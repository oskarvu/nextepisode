import React, { useContext, useEffect } from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MoviesIdsContextShape, MoviesIdsContext } from './Main'
import MovieTile from './MovieTile/MovieTile'
import {
  atom,
  atomFamily,
  RecoilState,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

const List = tw(motion.ul)`
  flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

export default function MoviesList() {
  const { moviesIds } = useContext<MoviesIdsContextShape>(MoviesIdsContext)
  const moviesAtomsList = useRecoilValue(moviesAtoms)

  useEffect(() => {
    setTimeout(() => {
      console.log(moviesAtomsList)
    }, 1000)
  })

  return (
    <List>
      <AnimateSharedLayout>
        <AnimatePresence>
          {moviesIds.map((mId, idx) => (
            <MovieTile key={mId} movieId={mId} />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </List>
  )
}
