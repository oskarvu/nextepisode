import React, { useContext, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { MoviesContext, MoviesContextShape } from './Main'

import { fetchFromTMDB, getApiURL, parseToMovie } from '../utils/api'
import { ApiQueryType, SearchResult } from '../api/types'

import PlusCircle from '../assets/icons/PlusCircle'
import CheckCircle from '../assets/icons/CheckCircle'
import XCircle from '../assets/icons/XCircle'
import { motion } from 'framer-motion'

const Modal = styled(motion.div)(({ maxHeight }: { maxHeight: number }) => [
  tw`
    absolute z-10 overflow-y-auto
    w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12
    ml-auto
    bg-white rounded-b-4xl shadow-lg
  `,
  `max-height: ${maxHeight}px`,
])

//max-h-screen overflow-y-scroll

const Result = tw.li`
  flex flex-row items-center
  mx-4 my-2 first:mt-3 last:mb-5
`

const ResultButton = tw.button`
  w-full py-3 pr-2 pl-3 ml-1
  rounded-full border-white border-2
  focus:outline-none focus:bg-white focus:border-gray-300
  text-gray-600 text-base sm:text-xl font-medium text-left
  hover:bg-gray-100 hover:text-gray-800
`

const SpannedYear = tw.span`
  float-right
  py-1 px-2 mr-1 rounded-full
  text-sm
  bg-gray-300
`

const CircleIconBase = `
  cursor-pointer
  w-12 h-12
  text-gray-400
  hover:text-gray-600
`

const PlusCircleIcon = tw(PlusCircle)`${CircleIconBase}`

const XCircleIcon = tw(XCircle)`${CircleIconBase}`

const CheckCircleIcon = tw(CheckCircle)`${CircleIconBase}`

interface CircleIconProps {
  movieId: number
}

function CircleIcon({ movieId }: CircleIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext)

  const movieOnList = movies.find((m) => m.id === movieId)
  if (movieOnList) {
    if (isHovered) {
      return (
        <XCircleIcon
          onClick={() => {
            setMovies(movies.filter((m) => m.id !== movieId))
          }}
          onMouseLeave={() => setIsHovered(false)}
        />
      )
    } else {
      return <CheckCircleIcon onMouseEnter={() => setIsHovered(true)} />
    }
  } else {
    return (
      <PlusCircleIcon
        onClick={() => {
          const queryText = getApiURL(movieId, ApiQueryType.TV)
          fetchFromTMDB(queryText).then((movie) => {
            !movies.find((m) => m.id === movie.id) &&
              setMovies([...movies, parseToMovie(movie)])
          })
          setIsHovered(true)
        }}
      />
    )
  }
}

interface ResultsModalProps {
  results: SearchResult[]
  maxHeight: number
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSearchBarInputText: React.Dispatch<React.SetStateAction<string>>
}

// todo: make something with event handlers
// todo: focus on already existing element on list if clicked
// todo: add keyboard navigation through results modal
// todo: rewrite results button
// todo: scale or elipsis font on small devices
export default function ResultsModal({
  results,
  setVisible,
  maxHeight,
  setSearchBarInputText,
}: ResultsModalProps) {
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext)

  return (
    <Modal
      maxHeight={maxHeight}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, translateY: 0, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      style={{ originY: 0 }}
      transition={{ duration: 0.3, type: 'tween' }}
    >
      <ul>
        {results.slice(0, 10).map((result) => (
          <Result key={result.id}>
            <CircleIcon movieId={result.id} />
            <ResultButton
              onClick={() => {
                setVisible(false)
                setSearchBarInputText('')
                const queryText = getApiURL(result.id, ApiQueryType.TV)
                fetchFromTMDB(queryText).then((movie) => {
                  !movies.find((m) => m.id === movie.id) &&
                    setMovies([parseToMovie(movie), ...movies])
                })
              }}
            >
              {result.name}
              {result.firstAirDate && (
                <SpannedYear>{result.firstAirDate.substr(0, 4)}</SpannedYear>
              )}
            </ResultButton>
          </Result>
        ))}
      </ul>
    </Modal>
  )
}
