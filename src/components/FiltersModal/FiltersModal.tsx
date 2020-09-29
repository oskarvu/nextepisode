import React, { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import tw, { styled } from 'twin.macro'
import { LocalStorage } from '../../db/types'
import { FilterModalText } from '../../translations/en-US'
import { LabeledCheckbox } from './LabeledCheckbox'
import Adjustments from '../../assets/icons/motionable/Adjustments'
import { AnimatePresence, motion } from 'framer-motion'
import useHideWhenClickedOutside from '../../hooks/useHideWhenClickedOutside'
import X from '../../assets/icons/motionable/X'
import { isResultsModalVisible } from '../SearchBar/resultsModalSharedState'

interface ModalProps {
  isModalOpen: boolean
  isResultsModalVisible: boolean
}

const Modal = styled(motion.div)(({ isModalOpen, isResultsModalVisible }: ModalProps) => [
  tw`fixed bottom-0 z-10 h-24 mb-3 md:top-0 md:mt-32 md:-ml-16 lg:-ml-24
  mt-4 mr-3 -ml-1 bg-white p-4 rounded-4xl shadow-delicate`,
  !isModalOpen && tw`h-14 w-14 cursor-pointer rounded-full`,
  isResultsModalVisible && tw`hidden lg:block`,
])

const SectionName = tw.h5`
  ml-1 mb-2 mt-1 text-gray-600 font-bold text-xs sm:text-sm tracking-wide uppercase
`

const AdjustmentsIcon = tw(Adjustments)`
  h-6 w-6 text-gray-700
`

const ModalContent = tw(motion.div)`
  relative mb-2
`

const CloseIcon = tw(X)`
  absolute
  right-0 -mt-3 -mr-2 w-6 h-6
  text-gray-500 cursor-pointer
  hover:text-gray-800
`

export enum Sort {
  alphabetically = 'alphabetically',
  byPremiere = 'by-premiere',
  byAddTime = 'by-add-time',
}

const sortByMethod = localStorage.getItem(LocalStorage.sortMethod)

export const sortMethod = atom<Sort>({
  key: 'sortMethod',
  default: sortByMethod ? JSON.parse(sortByMethod) : Sort.byAddTime,
})

export const FiltersModal: React.FC<any> = () => {
  const [sortBy, setSortBy] = useRecoilState(sortMethod)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isResultsModalVisibleValue = useRecoilValue(isResultsModalVisible)
  const modalRef = useRef<HTMLDivElement>(null)

  useHideWhenClickedOutside(modalRef, setIsModalOpen)

  useEffect(() => {
    localStorage.setItem(LocalStorage.sortMethod, JSON.stringify(sortBy))
  }, [sortBy])

  return (
    <AnimatePresence>
      <Modal
        isModalOpen={isModalOpen}
        isResultsModalVisible={isResultsModalVisibleValue}
        onClick={() => !isModalOpen && setIsModalOpen(true)}
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isModalOpen ? (
          <ModalContent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CloseIcon onClick={() => setIsModalOpen(false)} />
            <SectionName>Sort by:</SectionName>
            <div>
              <LabeledCheckbox
                setSortBy={setSortBy}
                checked={sortBy === Sort.byPremiere}
                value={Sort.byPremiere}
              >
                {FilterModalText.timeLeft}
              </LabeledCheckbox>
              <LabeledCheckbox
                setSortBy={setSortBy}
                checked={sortBy === Sort.byAddTime}
                value={Sort.byAddTime}
              >
                {FilterModalText.addOrder}
              </LabeledCheckbox>
              <LabeledCheckbox
                setSortBy={setSortBy}
                checked={sortBy === Sort.alphabetically}
                value={Sort.alphabetically}
              >
                {FilterModalText.alphabetically}
              </LabeledCheckbox>
            </div>
          </ModalContent>
        ) : (
          <AdjustmentsIcon />
        )}
      </Modal>
    </AnimatePresence>
  )
}
