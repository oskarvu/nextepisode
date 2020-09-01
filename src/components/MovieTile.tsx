import React, { useContext, useEffect, useRef, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { AnimatePresence, motion } from 'framer-motion'

import { MoviesContext, MoviesContextShape } from './Main'
import { Movie } from '../api/types'

import DefaultBGImage from '../assets/images/placeholder.jpg'
import Countdown from './Countdown'
import MovieDetailsCard from './MovieDetailsCard'

// todo: default backdrop if backdrop is null
const tileBaseStyle = `
  w-full xxl:w-49/100 xxxl:w-32/100 h-auto sm:h-56
  mt-2 xxl:mr-2
  rounded-4xl overflow-hidden bg-white bg-cover bg-center
`

// todo: load different image background on different devices
const Tile = styled(motion.div)(({ backdrop }: { backdrop: string | null }) => [
  tw`${tileBaseStyle}`,
  tw`
    flex flex-col sm:flex-row
  `,
  `box-shadow: inset 0 0 10px 0 rgba(0,0,0,0.3);`,
  backdrop && `background-image: url("${backdrop}");`,
])

const FakeTile = tw(motion.div)`${tileBaseStyle}`

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
// todo: cleanup this component
export default function MovieTile({ movie }: { movie: Movie }) {
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext)
  const [backdrop, setBackdrop] = useState<string | null>(null)

  useEffect(() => {
    if (!movie.backdrop) {
      setBackdrop(DefaultBGImage)
      return
    }
    const imageUrl = `https://image.tmdb.org/t/p/w1280/${movie.backdrop}`
    const preloadedImg: HTMLImageElement = document.createElement('img')
    preloadedImg.src = imageUrl

    preloadedImg.addEventListener('load', () => {
      window.setTimeout(() => setBackdrop(imageUrl), 2000)
    })
  }, [movie])

  return backdrop ? (
    <Tile
      backdrop={backdrop}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <StartContainer>
        <Countdown nextEpisode={movie.nextEpisode} status={movie.status} />
      </StartContainer>
      <EndContainer>
        <MovieDetailsCard movie={movie} movies={movies} setMovies={setMovies} />
      </EndContainer>
    </Tile>
  ) : (
    <FakeTile
      initial={{ opacity: 0 }}
      animate={{ opacity: [1, 0.5, 1] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3, loop: Infinity }}
      layout
    />
  )
}
