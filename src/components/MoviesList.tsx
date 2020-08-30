import React, { useContext } from 'react'

import 'twin.macro'
import { MoviesContext, MoviesContextShape } from './Main'
import MovieTile from './MovieTile'
import tw from 'twin.macro'

const List = tw.ul`
  w-full md:w-10/12 lg:w-9/12 xl:w-8/12
  m-auto px-4
`

function MoviesList() {
  const { movies } = useContext<MoviesContextShape>(MoviesContext)

  return (
    <List>
      {movies.map((m) => (
        <MovieTile key={m.id} movie={m} />
      ))}
    </List>
  )
}

export default MoviesList
