import React, { useContext, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { motion } from 'framer-motion'

import { MoviesIdsContext, MoviesIdsContextShape } from '../Main'
import { SearchResult } from '../../api/types'

import Check from '../../assets/icons/Check'

const Modal = styled(motion.div)(({ maxHeight }: { maxHeight: number }) => [
  tw`
    absolute z-10 overflow-y-auto
    w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
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
  w-full py-3 pr-2 pl-4 ml-1
  rounded-full border-white border-2
  focus:outline-none focus:bg-white focus:border-gray-300
  text-gray-700 text-base sm:text-xl font-medium text-left
  hover:bg-gray-100 hover:text-gray-800
`

const ResultText = tw.div`
  pr-2 pb-1
`

const ResultCheck = tw(Check)`
  w-4 h-6
`

const PillsContainer = tw.div`
  flex
`

const InfoPill = tw.div`
  py-1 px-2 mr-1 rounded-full
  text-sm
  bg-gray-300
`

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

  function handleOnClick(result: SearchResult) {
    setVisible(false)
    setSearchBarInputText('')
    !moviesIds.find((mId) => mId === result.id) &&
      setMoviesIds([result.id, ...moviesIds])
  }

  return (
    <Modal
      maxHeight={maxHeight}
      initial={{ scaleY: 0.5, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0.5, opacity: 0 }}
      style={{ originY: 0 }}
      transition={{ duration: 0.3, type: 'tween' }}
    >
      <ul>
        {results.slice(0, 10).map((result) => (
          <Result key={result.id}>
            <ResultButton onClick={() => handleOnClick(result)}>
              <ResultText>{result.name}</ResultText>
              <PillsContainer>
                {moviesIds.find((id) => result.id === id) && (
                  <InfoPill>
                    <ResultCheck />
                  </InfoPill>
                )}
                {result.firstAirDate && (
                  <InfoPill>{result.firstAirDate.substr(0, 4)}</InfoPill>
                )}
              </PillsContainer>
            </ResultButton>
          </Result>
        ))}
      </ul>
    </Modal>
  )
}
