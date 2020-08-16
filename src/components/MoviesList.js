import React, { useContext } from 'react'

import 'twin.macro'
import { MoviesContext } from './Main'

function MoviesList() {
  const [movies, setMovies] = useContext(MoviesContext)

  return (
    <ul tw="list-disc">
      {movies.map((movie) => (
        <li
          key={movie.id}
          onClick={() => setMovies(movies.filter((m) => m.id !== movie.id))}
        >
          {movie.original_name}
        </li>
      ))}
    </ul>
  )
}

export default MoviesList
