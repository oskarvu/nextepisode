import React, { useContext } from 'react'
import tw, { styled } from 'twin.macro'
import { MoviesContext } from './Main'
import { fetchFromTMDB, getApiURL } from '../utils/api'
import apiConfig from '../api/config'

const Modal = styled.div(({ visible }) => [
  tw`
    absolute w-4/6
    bg-white
    rounded-b-4xl
  `,
  visible ? tw`visible` : tw`invisible`,
])

const Result = tw.li`
  mx-6 my-1 first:mt-3 last:mb-5
`

const ResultButton = tw.button`
  w-full p-3 pb-4
  rounded-full focus:outline-none
  text-gray-600 text-xl font-medium text-left
  hover:bg-gray-100 hover:text-gray-800 hover:font-bold
`

const StyledSpan = tw.span`
  px-2 pb-1 mr-2
  bg-gray-300 rounded-full
  font-black
`
//TODO: rename setInputText to more reasonable
function ResultsModal({ results, visible, setVisible, setInputText }) {
  const [movies, setMovies] = useContext(MoviesContext)

  // TODO: fetch new data after getting movie id
  return (
    <Modal visible={visible}>
      <ul>
        {results.slice(0, 10).map((result) => (
          <Result key={result.id}>
            <ResultButton
              onClick={() => {
                setVisible(false)
                setInputText('')
                const queryText = getApiURL(result.id, apiConfig.queryType.TV)
                fetchFromTMDB(queryText).then((data) => {
                  setMovies([...movies, data])
                })
              }}
            >
              <StyledSpan>+</StyledSpan> {result.name}
            </ResultButton>
          </Result>
        ))}
      </ul>
    </Modal>
  )
}

export default ResultsModal
