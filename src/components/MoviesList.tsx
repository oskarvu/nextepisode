import React, { useContext } from 'react'
import tw from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MoviesContext, MoviesContextShape } from './Main'
import MovieTile from './MovieTile'

const List = tw(motion.ul)`
  flex flex-wrap justify-start
  w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-8/12
  m-auto mt-2 px-4
`

export default function MoviesList() {
  const { movies } = useContext<MoviesContextShape>(MoviesContext)

  return (
    <AnimateSharedLayout>
      <List layout>
        <AnimatePresence>
          {movies.map((m) => (
            <MovieTile key={m.id} movie={m} />
          ))}
        </AnimatePresence>
      </List>
    </AnimateSharedLayout>
  )
}
