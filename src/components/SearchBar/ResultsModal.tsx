import React from 'react'
import tw, { styled } from 'twin.macro'
import { motion } from 'framer-motion'

import { SearchResult } from '../../api/types'

import SingleResult from './SingleResult'
import { Texts } from '../../translations/en-US'
import capitalize from '../../utils/capitalize'

const Modal = styled(motion.div)(({ maxHeight }: { maxHeight: number }) => [
  tw`
    absolute z-50 overflow-y-auto
    w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
    ml-auto
    bg-white rounded-b-4xl shadow-lg
  `,
  `max-height: ${maxHeight}px`,
])

const NoResultsText = tw.li`
  ml-6 mt-3 mb-4
  text-gray-700 text-base sm:text-xl font-medium text-left
`

interface ResultsModalProps {
  results: SearchResult[]
  maxHeight: number
  setSearchBarInputText: React.Dispatch<React.SetStateAction<string>>
  searchBarInputText: string
}

// todo: handle errors from api
// todo: make results limit parametrized
export default function ResultsModal({
  results,
  maxHeight,
  setSearchBarInputText,
  searchBarInputText,
}: ResultsModalProps) {
  return (
    <Modal
      maxHeight={maxHeight}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ originY: 0 }}
      transition={{ duration: 0.3, type: 'tween' }}
    >
      <ul>
        {results.length === 0 && searchBarInputText ? (
          <NoResultsText>{`${capitalize(Texts.noResults)}...`}</NoResultsText>
        ) : (
          results
            .slice(0, 10)
            .map((result) => (
              <SingleResult
                key={result.id}
                result={result}
                setSearchBarInputText={setSearchBarInputText}
              />
            ))
        )}
      </ul>
    </Modal>
  )
}
