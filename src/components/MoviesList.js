import React, { useContext } from 'react'

import 'twin.macro'
import { MoviesContext } from './Main'
import MovieTile from './MovieTile'
import tw from 'twin.macro'

const List = tw.ul`
  flex flex-col
  m-auto w-4/6
  items-center
`

function MoviesList() {
  const [movies, setMovies] = useContext(MoviesContext)

  return (
    <List>
      {movies.map((m) => (
        <MovieTile key={m.id} title={m.name} backdrop={m.backdrop_path} />
      ))}
    </List>
  )
}

export default MoviesList
