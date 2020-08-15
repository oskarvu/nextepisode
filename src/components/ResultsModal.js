import React, { useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'

// const Modal = tw.div`
//   absolute w-4/6
//   bg-white
//   rounded-b-4xl
// `

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

function ResultsModal({ results, movies, setMovies, visible, setVisible }) {
  const modalRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef, setVisible])

  return (
    <Modal ref={modalRef} visible={visible}>
      <ul>
        {results.slice(0, 10).map((movie) => (
          <Result key={movie.id}>
            <ResultButton
              onClick={() =>
                setMovies(
                  movies.some((m) => m.id === movie.id)
                    ? [...movies]
                    : [...movies, movie]
                )
              }
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
