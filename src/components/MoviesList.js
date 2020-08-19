import React, { useContext } from 'react'

import 'twin.macro'
import { MoviesContext } from './Main'
import MovieTile from './MovieTile'
import tw from 'twin.macro'

const List = tw.ul`
  flex flex-col
  m-auto w-7/12
  items-center
`

function MoviesList() {
  const [movies, setMovies] = useContext(MoviesContext)

  //todo: if there is no background, use default one

  return (
    <List>
      {movies.map((m) => (
        <MovieTile key={m.id} movie={m} />
      ))}
    </List>
  )
}

export default MoviesList
