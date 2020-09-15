import React, { useContext } from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MoviesIdsContextShape, MoviesIdsContext } from './Main'
import MovieTile from './movie-tile/MovieTile'

const List = tw(motion.ul)`
  flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

export default function MoviesList() {
  const { moviesIds } = useContext<MoviesIdsContextShape>(MoviesIdsContext)

  return (
    <List>
      <AnimateSharedLayout>
        <AnimatePresence>
          {moviesIds.map((mId) => (
            <MovieTile key={mId} movieId={mId} />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </List>
  )
}
