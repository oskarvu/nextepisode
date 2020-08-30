import React from 'react'
import tw, { styled } from 'twin.macro'
import Trash from '../assets/icons/Trash'
import { Movie } from '../api/types'
import DetailsCardTable from './DetailsCardTable'

const Details = tw.div`
  relative inline-flex justify-between flex-col
  w-full sm:w-auto sm:max-w-xs h-full p-3 pt-1
  bg-white shadow-lg
`

const MovieName = styled.h1(({ letters }: { letters: number }) => [
  tw`
    w-92
    ml-1 my-1 mb-2
    text-2xl sm:text-3xl font-bold text-gray-700 leading-tight
  `,
  letters > 14 && tw`text-xl sm:text-2xl`,
  letters > 28 && tw`text-lg sm:text-xl`,
  letters > 40 && tw`text-base sm:text-lg`,
])

const InfoBadge = tw.div`
  inline-block
  px-2 py-1 mr-1
  bg-gray-300 rounded-full
  text-xs uppercase font-bold text-gray-600 tracking-wider
`

const Cell = tw.td`
  px-3 py-2
  border border-gray-300 border-4 
  uppercase text-sm font-bold text-gray-600 tracking-wider
`

const TrashIcon = tw(Trash)`
  absolute right-0
  w-8 h-8 p-1
  cursor-pointer text-gray-500 hover:text-gray-700
`

const Table = tw.table`
  hidden sm:block w-full
`

interface Props {
  movie: Movie
  movies: Movie[]
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}

// todo: take into account series that are not yet aired
// todo: tidy up component data distribution
export default function MovieDetailsCard({ movie, movies, setMovies }: Props) {
  function handleTrashIconClick() {
    setMovies(movies.filter((m) => m.id !== movie.id))
  }

  return (
    <Details>
      <div>
        <MovieName letters={movie.name.length}>{movie.name}</MovieName>
        <InfoBadge>{movie.status}</InfoBadge>
        {movie.inProduction && <InfoBadge>in production</InfoBadge>}
      </div>
      <DetailsCardTable movie={movie} />
      <TrashIcon onClick={handleTrashIconClick} />
    </Details>
  )
}
