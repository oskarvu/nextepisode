import React, { useEffect } from 'react'
import tw, { styled } from 'twin.macro'

import { Movie } from '../../api/types'
import Trash from '../../assets/icons/Trash'
import DetailsCardTable from './DetailsCardTable'
import { FetchErrors, Texts } from '../../translations/en-US'
import { useSetRecoilState } from 'recoil'
import { movieNetwork } from './movieSharedState'
import { idMovieInitDataRecord, IdTimeLeftHistoric } from '../../views/movieCollectionState'
import { LocalStorage } from '../../db/types'

const Details = tw.div`
  relative flex justify-between flex-col
  w-full sm:w-auto sm:min-w-80/100 h-full p-3 pt-1
  bg-white shadow-lg
`

const MovieNameA = styled.a(({ letters }: { letters: number }) => [
  tw`
    block hover:text-gray-800
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
  px-2 py-1 mr-1 last:mb-2
  bg-gray-300 rounded-full
  text-xs uppercase font-bold text-gray-600 tracking-wider
`

const TrashIcon = styled(Trash)(() => [
  tw`absolute right-0
  w-8 h-8 p-1
  cursor-pointer text-gray-500 hover:text-gray-700`,
  '-webkit-tap-highlight-color: transparent;',
])

export default function MovieDetailsCard({ isError, movie }: { isError: boolean; movie: Movie }) {
  const setIdMovieRecord = useSetRecoilState(idMovieInitDataRecord)
  const setMovieNetwork = useSetRecoilState(movieNetwork(movie.id))

  useEffect(() => {
    setMovieNetwork(movie.network)
  }, [movie.network, setMovieNetwork])

  return isError ? (
    <Details>
      <div>
        <MovieNameA letters={FetchErrors.movieDetailsFetchErrorDesc.length}>
          {FetchErrors.movieDetailsFetchErrorDesc}
        </MovieNameA>
      </div>
      <TrashIcon onClick={handleTrashIconClick} />
    </Details>
  ) : (
    <Details>
      <div>
        <MovieNameA
          letters={movie.name.length}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/search?q=${encodeURI(movie.name)}`}
        >
          {movie.name}
        </MovieNameA>
        <InfoBadge>
          {movie.numberOfSeasons === 1
            ? `${movie.numberOfSeasons} ${Texts.season}`
            : `${movie.numberOfSeasons} ${Texts.seasons}`}
        </InfoBadge>
        {movie.network && <InfoBadge>{movie.network}</InfoBadge>}
      </div>
      <DetailsCardTable movie={movie} />
      <TrashIcon onClick={handleTrashIconClick} />
    </Details>
  )

  function handleTrashIconClick() {
    setIdMovieRecord((prevState) => {
      const { [movie.id]: drop, ...newState } = prevState
      return newState
    })
    IdTimeLeftHistoric.delete(movie.id)
    localStorage.setItem(
      LocalStorage.idTimeLeftMap,
      JSON.stringify(Array.from(IdTimeLeftHistoric.entries()))
    )
  }
}
