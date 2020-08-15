import React from 'react'
import tw from 'twin.macro'

const Modal = tw.div`
  absolute w-4/6
  bg-white
  rounded-b-4xl
`

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

function ResultsModal({ results, setMovies }) {
  return (
    <Modal>
      <ul>
        {results.slice(0, 10).map((movie) => (
          <Result key={movie.id}>
            <ResultButton
              onClick={() => setMovies((prevMovies) => [...prevMovies, movie])}
            >
              <StyledSpan>+</StyledSpan> {movie.original_name}
            </ResultButton>
          </Result>
        ))}
      </ul>
    </Modal>
  )
}

export default ResultsModal
