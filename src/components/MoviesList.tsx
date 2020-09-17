import React from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { movieIdList, idMovieShortDataMap } from './Main'
import MovieTile from './MovieTile/MovieTile'
import { useRecoilValue } from 'recoil'

const List = tw(motion.ul)`
  flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

export default function MoviesList() {
  const moviesData = useRecoilValue(idMovieShortDataMap)
  const moviesIds = useRecoilValue(movieIdList)

  return (
    <List>
      <AnimateSharedLayout>
        <AnimatePresence>
          {moviesIds.map((id) => (
            <MovieTile key={id} movieId={id} />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </List>
  )
}
