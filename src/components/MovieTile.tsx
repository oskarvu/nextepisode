import React, { useContext, useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { motion } from 'framer-motion'

import { MoviesIdsContext, MoviesIdsContextShape } from './Main'
import { ApiQueryType, Movie } from '../api/types'

import DefaultBGImage from '../assets/images/placeholder.jpg'
import Countdown from './Countdown'
import MovieDetailsCard from './MovieDetailsCard'
import { fetchFromTMDB, getApiURL, parseToMovie } from '../utils/api'

// todo: default backdrop if backdrop is null
const tileBaseStyle = `
  flex flex-col sm:flex-row
  w-full xl:w-1/2-8 xxxl:w-1/3-12 xxxxl:w-1/4-16 h-56
  my-2 xl:mx-2
  rounded-4xl overflow-hidden bg-gray-400 bg-cover bg-center
`

const Tile = styled(motion.div)(({ backdrop }: { backdrop: string | null }) => [
  tw`${tileBaseStyle}`,
  `box-shadow: inset 0 0 10px 0 rgba(0,0,0,0.3);`,
  `background-image: url("${backdrop}");`,
])

const FakeTile = tw(motion.div)`${tileBaseStyle}`

const StartContainer = tw.div`
    flex flex-grow justify-center
    w-full sm:w-6/12 xl:w-5/12 sm:h-full
    px-3 pt-2 pb-0 sm:p-5 sm:pr-0
  `

const EndContainer = tw.div`
  flex justify-end
  w-full sm:w-6/12 xl:w-7/12 sm:h-full
  p-3 pt-0 sm:p-5 sm:pl-0 mt-auto
`

// todo: check if something can be done with animation jumps
export default function MovieTile({ movieId }: { movieId: number }) {
  const { moviesIds, setMoviesIds } = useContext<MoviesIdsContextShape>(
    MoviesIdsContext
  )
  const [movie, setMovie] = useState<Movie | null>(null)
  const [backdrop, setBackdrop] = useState<string | null>(null)

  // todo: load different image background on different devices
  useEffect(() => {
    const queryText = getApiURL(movieId, ApiQueryType.TV)
    fetchFromTMDB(queryText).then((rawMovie) => {
      const parsedMovie = parseToMovie(rawMovie)
      setMovie(parsedMovie)
      if (!parsedMovie.backdrop) {
        setBackdrop(DefaultBGImage)
        return
      }
      const imageUrl = `https://image.tmdb.org/t/p/w1280/${parsedMovie.backdrop}`
      const preloadedImg: HTMLImageElement = document.createElement('img')
      preloadedImg.src = imageUrl

      preloadedImg.addEventListener('load', () => setBackdrop(imageUrl))
    })
  }, [movieId])

  return backdrop && movie ? (
    <Tile
      backdrop={backdrop}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      layout
    >
      <StartContainer>
        <Countdown nextEpisode={movie.nextEpisode} status={movie.status} />
      </StartContainer>
      <EndContainer>
        <MovieDetailsCard
          movie={movie}
          moviesIds={moviesIds}
          setMoviesIds={setMoviesIds}
        />
      </EndContainer>
    </Tile>
  ) : (
    <FakeTile
      initial={{ opacity: 0 }}
      animate={{ opacity: [1, 0.3, 1] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, loop: Infinity }}
      layout
    />
  )
}
