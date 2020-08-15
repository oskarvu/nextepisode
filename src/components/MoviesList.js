import React from 'react'

import 'twin.macro'

function MoviesList({ movies, setMovies }) {
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
