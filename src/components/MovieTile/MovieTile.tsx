import React, { useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

import { fetchMovieDetails } from '../../api/utils'

import useSetBackdropImage from '../../hooks/useSetBackdropImage'

import Countdown from './Countdown'
import MovieDetailsCard from './MovieDetailsCard'
import { ReactComponent as FakeContentImage } from '../../assets/images/fake-tile-bg.svg'
import { useQuery } from 'react-query'
import { movieFocusOn } from './movieSharedState'

const tileBaseStyle = `
  flex flex-col sm:flex-row
  w-full xl:w-1/2-8 xxxl:w-1/3-12 xxxxl:w-1/4-16 h-56
  my-2 xl:mx-2
  rounded-4xl overflow-hidden bg-gray-400 bg-cover bg-center
`

const Tile = styled(motion.div)`
  ${tw`${tileBaseStyle}`}
  ${({ backdrop }: { backdrop: string | null }) =>
    `background-image: url("${backdrop}");`}
  box-shadow: 0 0 0 #f56565, 0 0 10px 0 rgba(0,0,0,0.3) inset;
  transition: box-shadow 0.3s ease-in-out;
  :focus {
    outline: none;
    box-shadow: 0 0 0 6px #f56565, 0 0 10px 0 rgba(0, 0, 0, 0.3) inset;
  }
`

const FakeTile = tw(motion.div)`
  ${tileBaseStyle}
  justify-center
`

const FakeContent = tw(FakeContentImage)`
  w-full text-gray-300
`

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

export const MovieTile: React.FC<{ movieId: string }> = ({ movieId }) => {
  const [movieFocusIsOn, setMovieFocusIsOn] = useRecoilState(movieFocusOn(movieId))
  const { data: movie } = useQuery(movieId, () => fetchMovieDetails(movieId))
  const { isBackdropLoading, backdrop } = useSetBackdropImage(movie)
  const tileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (movieFocusIsOn && movie && !isBackdropLoading) {
      tileRef.current?.focus()
      setMovieFocusIsOn(false)
    }
  }, [isBackdropLoading, movie, movieFocusIsOn, setMovieFocusIsOn])

  return !isBackdropLoading && movie ? (
    <Tile
      tabIndex={-1}
      ref={tileRef}
      backdrop={backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      layout
    >
      <StartContainer>
        <Countdown nextEpisode={movie.nextEpisode} status={movie.status} movieId={movieId} />
      </StartContainer>
      <EndContainer>
        <MovieDetailsCard movie={movie} />
      </EndContainer>
    </Tile>
  ) : (
    <FakeTile
      initial={{ opacity: 0 }}
      animate={{ opacity: [1, 0.3, 1] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, loop: Infinity }}
    >
      <FakeContent />
    </FakeTile>
  )
}
