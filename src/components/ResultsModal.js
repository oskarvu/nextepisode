import React, { useContext } from 'react'
import tw from 'twin.macro'
import { MoviesContext } from './Main'
import { fetchFromTMDB, getApiURL } from '../utils/api'
import apiConfig from '../api/config'
import PlusCircle from '../assets/icons/PlusCircle'

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

const PlusCircleIcon = tw(PlusCircle)`
  inline
  w-8 h-8 mr-2 pb-1
  text-gray-400
  hover:text-gray-600
`

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
                <PlusCircleIcon />
                {result.name}
              </ResultButton>
            </Result>
          ))}
        </ul>
      </Modal>
    )
  )
}

export default ResultsModal
