import React, { useEffect, useRef, useState } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import tw, { styled } from 'twin.macro'
import { LocalStorage } from '../../db/types'
import { FilterModalText } from '../../translations/en-US'
import { LabeledRadio } from './LabeledRadio'
import { Adjustments } from '../../assets/icons/motionable/Adjustments'
import { AnimatePresence, motion } from 'framer-motion'
import useHideWhenClickedOutside from '../../hooks/useHideWhenClickedOutside'
import { X } from '../../assets/icons/motionable/X'
import { isResultsModalVisible } from '../SearchBar/resultsModalSharedState'
import { idMovieInitDataRecord, IdTimeLeftHistoric } from '../../views/movieCollectionState'

interface ModalProps {
  isModalOpen: boolean
  isResultsModalVisible: boolean
}

const Modal = styled(motion.div)(({ isModalOpen, isResultsModalVisible }: ModalProps) => [
  tw`fixed bottom-0 z-10 h-44 mb-3 md:top-0 md:mt-32 md:-ml-16 lg:-ml-24
  mt-4 mr-3 -ml-1 bg-white p-4 rounded-4xl shadow-delicate`,
  '-webkit-tap-highlight-color: transparent;',
  !isModalOpen && tw`h-14 w-14 cursor-pointer rounded-full`,
  isResultsModalVisible && tw`hidden lg:block`,
])

const SectionName = tw.h5`
  ml-1 mt-1 mb-2 text-gray-600 font-bold text-xs sm:text-sm tracking-wide uppercase
`

const AdjustmentsIcon = tw(Adjustments)`
  h-6 w-6 text-gray-700
`

const ModalContent = tw(motion.div)`
  relative mb-2
`

const DeleteSectionButtons = tw(motion.button)`
  bg-gray-300 mr-2 px-3 -mt-1 mb-2 py-2 rounded-full cursor-pointer hover:bg-gray-200
  text-xs sm:text-sm uppercase font-bold text-gray-800 tracking-wide
  focus:outline-none
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

export const isFilterModalExpanded = atom<boolean>({
  key: 'isFilterModalExpanded',
  default: false,
})

export const FiltersModal: React.FC<any> = () => {
  const [sortBy, setSortBy] = useRecoilState(sortMethod)
  const [isModalExpanded, setIsModalExpanded] = useRecoilState(isFilterModalExpanded)
  const isResultsModalVisibleValue = useRecoilValue(isResultsModalVisible)
  const modalRef = useRef<HTMLDivElement>(null)
  const setIdMovieRecord = useSetRecoilState(idMovieInitDataRecord)
  const [confirmButtonsVisible, setConfirmButtonsVisible] = useState(false)

  useHideWhenClickedOutside(modalRef, setIsModalExpanded)

  useEffect(() => {
    localStorage.setItem(LocalStorage.sortMethod, JSON.stringify(sortBy))
  }, [sortBy])

  return (
    <AnimatePresence>
      <Modal
        isModalOpen={isModalExpanded}
        isResultsModalVisible={isResultsModalVisibleValue}
        onClick={() => !isModalExpanded && setIsModalExpanded(true)}
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {isModalExpanded ? (
          <ModalContent initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CloseIcon iconLabel="close" onClick={() => setIsModalExpanded(false)} />
            <SectionName>Remove all tv shows:</SectionName>
            {confirmButtonsVisible ? (
              <>
                <DeleteSectionButtons onClick={handleDeleteAll}>yes</DeleteSectionButtons>
                <DeleteSectionButtons onClick={() => setConfirmButtonsVisible(false)}>
                  no
                </DeleteSectionButtons>
              </>
            ) : (
              <DeleteSectionButtons onClick={() => setConfirmButtonsVisible(true)}>
                delete all
              </DeleteSectionButtons>
            )}
            <SectionName>Sort by:</SectionName>
            <div>
              <LabeledRadio
                setSortBy={setSortBy}
                checked={sortBy === Sort.byPremiere}
                value={Sort.byPremiere}
              >
                {FilterModalText.timeLeft}
              </LabeledRadio>
              <LabeledRadio
                setSortBy={setSortBy}
                checked={sortBy === Sort.byAddTime}
                value={Sort.byAddTime}
              >
                {FilterModalText.addOrder}
              </LabeledRadio>
              <LabeledRadio
                setSortBy={setSortBy}
                checked={sortBy === Sort.alphabetically}
                value={Sort.alphabetically}
              >
                {FilterModalText.alphabetically}
              </LabeledRadio>
            </div>
          </ModalContent>
        ) : (
          <AdjustmentsIcon iconLabel="adjust" />
        )}
      </Modal>
    </AnimatePresence>
  )

  function handleDeleteAll() {
    setIdMovieRecord({})
    IdTimeLeftHistoric.clear()
    localStorage.setItem(LocalStorage.idTimeLeftMap, JSON.stringify([]))
  }
}
