import React, { useContext, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { MoviesIdsContext, MoviesIdsContextShape } from './Main'
import { SearchResult } from '../api/types'

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

const Result = tw.li`
  flex flex-row items-center
  mx-3 last:mb-1
`

const ResultButton = tw.button`
  flex flex-row justify-between items-center
  w-full py-3 pr-2 pl-3 ml-1
  rounded-full border-white border-2
  focus:outline-none focus:bg-white focus:border-gray-300
  text-gray-700 text-base sm:text-xl font-medium text-left
  hover:bg-gray-100 hover:text-gray-800
`

const ResultText = tw.div`
  pr-2 pb-1
`

const ResultYear = tw.div`
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
  const { moviesIds, setMoviesIds } = useContext<MoviesIdsContextShape>(
    MoviesIdsContext
  )

  const movieOnList = moviesIds.find((mId) => mId === movieId)
  if (movieOnList) {
    if (isHovered) {
      return (
        <XCircleIcon
          onClick={() => {
            setMoviesIds(moviesIds.filter((mId) => mId !== movieId))
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
          setMoviesIds([movieId, ...moviesIds])
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

// todo: handle errors from api
// todo: focus on already existing element on list if clicked
export default function ResultsModal({
  results,
  setVisible,
  maxHeight,
  setSearchBarInputText,
}: ResultsModalProps) {
  const { moviesIds, setMoviesIds } = useContext<MoviesIdsContextShape>(
    MoviesIdsContext
  )

  // function handleOnClick(result: SearchResult) {
  //   setVisible(false)
  //   setSearchBarInputText('')
  //   const queryText = getApiURL(result.id, ApiQueryType.TV)
  //   fetchFromTMDB(queryText).then((movie) => {
  //     !movies.find((m) => m.id === movie.id) &&
  //       setMovies([parseToMovie(movie), ...movies])
  //   })
  // }

  function handleOnClick(result: SearchResult) {
    setVisible(false)
    setSearchBarInputText('')
    !moviesIds.find((mId) => mId === result.id) &&
      setMoviesIds([result.id, ...moviesIds])
  }

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
            <ResultButton onClick={() => handleOnClick(result)}>
              <ResultText>{result.name}</ResultText>
              {result.firstAirDate && (
                <ResultYear>{result.firstAirDate.substr(0, 4)}</ResultYear>
              )}
            </ResultButton>
          </Result>
        ))}
      </ul>
    </Modal>
  )
}
