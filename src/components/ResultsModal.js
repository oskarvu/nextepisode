import React from 'react'
import tw from 'twin.macro'

const Modal = tw.div`
  absolute w-4/6
  bg-white
  rounded-b-4xl
  text-gray-500 text-xl font-medium text-left
`

const Li = tw.li`
  ml-6 p-1 first:mt-5 last:mb-5
`

function ResultsModal({ results }) {
  return (
    <Modal>
      <ul>
        {results.map((movie) => (
          <Li key={movie.id}>{movie.original_name}</Li>
        ))}
      </ul>
    </Modal>
  )
}

export default ResultsModal
