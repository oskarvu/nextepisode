import React from 'react'

import 'twin.macro'

function MoviesList({ movies }) {
  return (
    <ul tw="list-disc">
      {movies.map((movie) => (
        <li key={movie.id}>{movie.original_name}</li>
      ))}
    </ul>
  )
}

export default MoviesList
