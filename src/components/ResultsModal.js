import React, { useContext, useState } from 'react'
import tw from 'twin.macro'
import { MoviesContext } from './Main'
import { fetchFromTMDB, getApiURL } from '../utils/api'
import apiConfig from '../api/config'
import PlusCircle from '../assets/icons/PlusCircle'
import CheckCircle from '../assets/icons/CheckCircle'
import XCircle from '../assets/icons/XCircle'

const Modal = tw.div`
  absolute w-4/6
  bg-white
  rounded-b-4xl
`

const Result = tw.li`
  mx-6 my-1 first:mt-3 last:mb-5
`

const ResultButton = tw.button`
  w-full p-3
  rounded-full focus:outline-none
  text-gray-600 text-xl font-medium text-left
  hover:bg-gray-100 hover:text-gray-800 hover:font-bold
`

const CircleIconBase = `
  inline
  w-8 h-8 mr-2 pb-1
  text-gray-400
  hover:text-gray-600
`

const PlusCircleIcon = tw(PlusCircle)`${CircleIconBase}`

const XCircleIcon = tw(XCircle)`${CircleIconBase}`

const CheckCircleIcon = tw(CheckCircle)`${CircleIconBase}`

const SpanButton = tw.span`
  float-right
  py-1 px-2 rounded-full
  text-sm
  bg-gray-300
`

function CircleIcon({ movieId }) {
  const [isHovered, setIsHovered] = useState(false)
  const [movies, setMovies] = useContext(MoviesContext)

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
    return <PlusCircleIcon />
  }
}

function ResultsModal({ results, visible, setVisible, setSearchBarInputText }) {
  const [movies, setMovies] = useContext(MoviesContext)

  // todo: implement sorting with the smallest time to air
  return (
    visible && (
      <Modal visible={visible}>
        <ul>
          {results.slice(0, 10).map((result) => (
            <Result key={result.id}>
              <ResultButton
                onClick={() => {
                  setVisible(false)
                  setSearchBarInputText('')
                  const queryText = getApiURL(result.id, apiConfig.queryType.TV)
                  fetchFromTMDB(queryText).then((movie) => {
                    !movies.find((m) => m.id === movie.id) &&
                      setMovies([...movies, movie])
                  })
                }}
              >
                <CircleIcon movieId={result.id} />
                {result.name}
                {result.first_air_date && (
                  <SpanButton>{result.first_air_date.substr(0, 4)}</SpanButton>
                )}
              </ResultButton>
            </Result>
          ))}
        </ul>
      </Modal>
    )
  )
}

export default ResultsModal
