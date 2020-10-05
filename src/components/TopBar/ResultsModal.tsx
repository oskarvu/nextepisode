import React from 'react'
import tw, { styled } from 'twin.macro'
import { motion } from 'framer-motion'

import { searchResultsRenderLimit } from '../../api/config'
import { SearchResult } from '../../api/types'
import { FetchErrors, SearchBarTexts } from '../../translations/en-US'

import { SingleResult } from './SingleResult'

const Modal = styled(motion.div)(({ maxHeight }: { maxHeight: number }) => [
  tw`
    absolute z-50 overflow-y-auto
    w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
    bg-white rounded-b-4xl shadow-lg
  `,
  `max-height: ${maxHeight}px`,
])

const NotResultsLi = tw.li`
  ml-6 mt-3 mb-4
  text-gray-700 text-base sm:text-xl font-medium text-left
`

const TrendingTextContainer = tw.div`
  py-2 text-center
`

const TrendingText = tw.span`
  relative z-20
  py-2 px-3 mr-1
  text-base font-medium text-gray-700
  rounded-full bg-gray-200
`

interface ResultsModalProps {
  results: SearchResult[]
  maxHeight: number
  setSearchBarInputText: React.Dispatch<React.SetStateAction<string>>
  searchBarInputText: string
  isFetchError: boolean
}

export function ResultsModal(props: ResultsModalProps) {
  const { results, maxHeight, setSearchBarInputText, searchBarInputText, isFetchError } = props

  let toRender
  if (results.length === 0 && searchBarInputText) {
    toRender = <NotResultsLi>{SearchBarTexts.noResults}</NotResultsLi>
  } else if (isFetchError) {
    toRender = <NotResultsLi>{FetchErrors.searchResultFetchError}</NotResultsLi>
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
    <Modal maxHeight={maxHeight} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {!searchBarInputText && (
        <TrendingTextContainer>
          <TrendingText>Trending this week:</TrendingText>
        </TrendingTextContainer>
      )}
      <ul>{toRender}</ul>
    </Modal>
  )
}
