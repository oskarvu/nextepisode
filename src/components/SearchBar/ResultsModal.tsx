import React from 'react'
import tw, { styled } from 'twin.macro'
import { motion } from 'framer-motion'

import { SearchResult } from '../../api/types'

import SingleResult from './SingleResult'

const Modal = styled(motion.div)(({ maxHeight }: { maxHeight: number }) => [
  tw`
    absolute z-10 overflow-y-auto
    w-full md:w-10/12 lg:w-8/12 xl:w-7/12 xxl:w-5/12 xxxl:w-4/12 xxxxl:w-3/12
    ml-auto
    bg-white rounded-b-4xl shadow-lg
  `,
  `max-height: ${maxHeight}px`,
])

interface ResultsModalProps {
  results: SearchResult[]
  maxHeight: number
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSearchBarInputText: React.Dispatch<React.SetStateAction<string>>
}

// todo: handle errors from api
// todo: focus on already existing element on list if clicked
// todo: make results limit parametrized
export default function ResultsModal({
  results,
  setVisible,
  maxHeight,
  setSearchBarInputText,
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
        {results.slice(0, 10).map((result) => (
          <SingleResult
            key={result.id}
            result={result}
            setModalVisible={setVisible}
            setSearchBarInputText={setSearchBarInputText}
          />
        ))}
      </ul>
    </Modal>
  )
}
