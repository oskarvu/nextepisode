import React, { useContext, useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { MoviesContext, MoviesContextShape } from './Main'
import { Movie } from '../api/types'

import Countdown from './Countdown'
import MovieDetailsCard from './MovieDetailsCard'

// todo: default backdrop if backdrop is null
const Tile = styled.div(({ backdrop }: { backdrop: string | null }) => [
  tw`
    flex flex-col sm:flex-row
    w-full xxl:w-49/100 xxxl:w-32/100 h-auto sm:h-56
    mt-2 xxl:mr-2
    rounded-4xl overflow-hidden bg-cover bg-center
  `,
  `box-shadow: inset 0 0 10px 0 rgba(0,0,0,0.3);`,
  `background-image: url("https://image.tmdb.org/t/p/w1280/${backdrop}");`,
])

const StartContainer = tw.div`
    flex justify-center
    w-full sm:w-5/12 lg:w-1/2 xl:w-1/2 xxl:w-5/12 sm:h-full
    px-4 pt-4 pb-3 sm:p-5 sm:pr-0
  `

const EndContainer = tw.div`
  flex justify-end
  w-full sm:w-7/12 lg:w-1/2 xl:w-1/2 xxl:w-7/12 sm:h-full
  p-4 pt-0 sm:p-5 sm:pl-0
`

export const SuspenseTile = tw.div`
  flex flex-col sm:flex-row
  w-full xxl:w-49/100 xxxl:w-32/100 h-auto sm:h-56
  mt-2 xxl:mr-2
  bg-gray-400 rounded-4xl overflow-hidden
`

export default function MovieTile({ movie }: { movie: Movie }) {
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext)
  const [backdrop, setBackdrop] = useState<string | null>(
    'rqHL4HsLCix9H6vhCwAuSOge0NS.jpg'
  )
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)

  useEffect(() => {
    if (!movie.backdrop) {
      setIsBackgroundLoaded(true)
      return
    }
    const imageUrl = `https://image.tmdb.org/t/p/w1280/${movie.backdrop}`
    const preloadedImg: HTMLImageElement = document.createElement('img')
    preloadedImg.src = imageUrl

    preloadedImg.addEventListener('load', () => {
      window.setTimeout(() => {
        setBackdrop(movie.backdrop)
        setIsBackgroundLoaded(true)
      }, 1000)
      // setBackdrop(movie.backdrop)
    })
  }, [movie])

  return isBackgroundLoaded ? (
    <Tile backdrop={backdrop}>
      <StartContainer>
        <Countdown nextEpisode={movie.nextEpisode} status={movie.status} />
      </StartContainer>
      <EndContainer>
        <MovieDetailsCard movie={movie} movies={movies} setMovies={setMovies} />
      </EndContainer>
    </Tile>
  ) : (
    <SuspenseTile>test</SuspenseTile>
  )
}
