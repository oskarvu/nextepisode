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
      {/*{movies.map((m) => (*/}
      {/*  <MovieTile key={m.key} title={m.name} />*/}
      {/*))}*/}
      <MovieTile key={1} title="Doom Patrol" />
      <MovieTile key={2} title="Legion" />
      <MovieTile key={3} title="Legendary" />
    </List>
  )
}

export default MoviesList
