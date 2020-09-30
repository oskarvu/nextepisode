import React from 'react'
import tw, { styled } from 'twin.macro'
import { motion } from 'framer-motion'

import { SearchResult } from '../../api/types'

import SingleResult from './SingleResult'
import { FetchErrors, Texts } from '../../translations/en-US'
import capitalize from '../../utils/capitalize'
import { searchResultsRenderLimit } from '../../api/config'

const Modal = styled(motion.div)(({ maxHeight }: { maxHeight: number }) => [
  tw`
    absolute z-50 overflow-y-auto
    w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
    ml-auto
    bg-white rounded-b-4xl shadow-lg
  `,
  `max-height: ${maxHeight}px`,
])

const NotResultsText = tw.li`
  ml-6 mt-3 mb-4
  text-gray-700 text-base sm:text-xl font-medium text-left
`

interface ResultsModalProps {
  results: SearchResult[]
  maxHeight: number
  setSearchBarInputText: React.Dispatch<React.SetStateAction<string>>
  searchBarInputText: string
  isFetchError: boolean
}

export default function ResultsModal({
  results,
  maxHeight,
  setSearchBarInputText,
  searchBarInputText,
  isFetchError,
}: ResultsModalProps) {
  let toRender
  if (results.length === 0 && searchBarInputText) {
    toRender = <NotResultsText>{`${capitalize(Texts.noResults)}...`}</NotResultsText>
  } else if (isFetchError) {
    toRender = (
      <NotResultsText>{`${capitalize(FetchErrors.searchResultFetchError)}...`}</NotResultsText>
    )
  } else {
    toRender = results
      .slice(0, searchResultsRenderLimit)
      .map((result) => (
        <SingleResult
          key={result.id}
          result={result}
          setSearchBarInputText={setSearchBarInputText}
        />
      ))
  }

  return (
    <Modal
      maxHeight={maxHeight}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ originY: 0 }}
      transition={{ duration: 0.3, type: 'tween' }}
    >
      <ul>{toRender}</ul>
    </Modal>
  )
}
