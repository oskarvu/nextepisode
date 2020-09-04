import React from 'react'
import tw, { styled } from 'twin.macro'
import Trash from '../assets/icons/Trash'
import { Movie } from '../api/types'
import DetailsCardTable from './DetailsCardTable'

const Details = tw.div`
  relative flex justify-between flex-col
  w-full sm:w-auto sm:min-w-80/100 h-full p-3 pt-1
  bg-white shadow-lg
`

const MovieName = styled.h1(({ letters }: { letters: number }) => [
  tw`
    w-92/100
    ml-1 my-1 mb-1
    text-2xl sm:text-3xl font-bold text-gray-700 leading-tight
  `,
  letters > 14 && tw`text-lg sm:text-2xl`,
  letters > 24 && tw`text-base sm:text-xl`,
  letters > 40 && tw`text-sm sm:text-lg`,
  letters > 60 && tw`text-xs sm:text-base`,
])

const InfoBadge = tw.div`
  inline-block
  px-2 py-1 mr-1 mb-2
  bg-gray-300 rounded-full
  text-xs uppercase font-bold text-gray-600 tracking-wider
`

const TrashIcon = tw(Trash)`
  absolute right-0
  w-8 h-8 p-1
  cursor-pointer text-gray-500 hover:text-gray-700
`

interface Props {
  movie: Movie
  moviesIds: number[]
  setMoviesIds: React.Dispatch<React.SetStateAction<number[]>>
}

export default function MovieDetailsCard({
  movie,
  moviesIds,
  setMoviesIds,
}: Props) {
  function handleTrashIconClick() {
    setMoviesIds(moviesIds.filter((mId) => mId !== movie.id))
  }

  return (
    <Details>
      <div>
        <MovieName letters={movie.name.length}>{movie.name}</MovieName>
        <InfoBadge>{movie.status}</InfoBadge>
      </div>
      <DetailsCardTable movie={movie} />
      <TrashIcon onClick={handleTrashIconClick} />
    </Details>
  )
}
