import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { AnimatePresence, motion } from 'framer-motion'
import tw, { styled } from 'twin.macro'

import { isResultsModalVisible } from '../TopBar/sharedState'
import { idMovieInitDataRecord, IdTimeLeftHistoric } from '../MovieCollection/sharedState'
import { isFilterModalExpanded, SortByMethod } from './sharedState'
import { SortMethod } from './types'

import { useHideWhenClickedOutside } from '../../hooks/useHideWhenClickedOutside'

import { LocalStorage } from '../../db/types'
import { CommonTexts, FilterModalTexts } from '../../translations/en-US'
import { LabeledRadio } from './LabeledRadio'
import { Adjustments } from '../../assets/icons/motionable/Adjustments'
import { X } from '../../assets/icons/motionable/X'

interface ModalProps {
  isModalOpen: boolean
  isResultsModalVisible: boolean
}

const Modal = styled(motion.div)(({ isModalOpen, isResultsModalVisible }: ModalProps) => [
  tw`fixed bottom-0 md:top-0 z-10
  mt-4 mr-3 mb-3 -ml-1 md:mt-32 md:-ml-16 lg:-ml-24 p-4
  h-44
  bg-white shadow-delicate rounded-4xl`,
  '-webkit-tap-highlight-color: transparent;',
  !isModalOpen && tw`h-14 w-14 cursor-pointer rounded-full`,
  isResultsModalVisible && tw`hidden lg:block`,
])

const SectionName = tw.h5`
  mt-1 ml-1 mb-2
  text-gray-600 font-bold text-xs sm:text-sm tracking-wide uppercase
`

const AdjustmentsIcon = tw(Adjustments)`
  h-6 w-6
  text-gray-700
`

const ModalContent = tw(motion.div)`
  relative
  mb-2
`

const DeleteSectionButtons = tw(motion.button)`
  -mt-1 mr-2 mb-2 py-2 px-3
  text-xs sm:text-sm uppercase font-bold text-gray-800 tracking-wide
  bg-gray-300 hover:bg-gray-200 rounded-full cursor-pointer 
  focus:outline-none
`

const CloseIcon = tw(X)`
  absolute right-0
  -mt-3 -mr-2
  w-6 h-6
  text-gray-500 cursor-pointer hover:text-gray-800
`

export const FiltersModal: React.FC<any> = () => {
  const [confirmButtonsVisible, setConfirmButtonsVisible] = useState(false)
  const [sortBy, setSortBy] = useRecoilState(SortByMethod)
  const [isModalExpanded, setIsModalExpanded] = useRecoilState(isFilterModalExpanded)
  const isResultsModalVisibleValue = useRecoilValue(isResultsModalVisible)
  const setIdMovieRecord = useSetRecoilState(idMovieInitDataRecord)
  const modalRef = useRef<HTMLDivElement>(null)

  useHideWhenClickedOutside(modalRef, setIsModalExpanded)

  useEffect(() => {
    //todo: refactor
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
            <SectionName>{FilterModalTexts.removeAll}:</SectionName>
            {confirmButtonsVisible ? (
              <>
                <DeleteSectionButtons onClick={handleDeleteAll}>
                  {CommonTexts.yes}
                </DeleteSectionButtons>
                <DeleteSectionButtons onClick={() => setConfirmButtonsVisible(false)}>
                  {CommonTexts.no}
                </DeleteSectionButtons>
              </>
            ) : (
              <DeleteSectionButtons onClick={() => setConfirmButtonsVisible(true)}>
                {FilterModalTexts.deleteAll}
              </DeleteSectionButtons>
            )}
            <SectionName>{FilterModalTexts.deleteAll}:</SectionName>
            <div>
              <LabeledRadio
                setSortBy={setSortBy}
                checked={sortBy === SortMethod.byPremiere}
                value={SortMethod.byPremiere}
              >
                {FilterModalTexts.timeLeft}
              </LabeledRadio>
              <LabeledRadio
                setSortBy={setSortBy}
                checked={sortBy === SortMethod.byAddTime}
                value={SortMethod.byAddTime}
              >
                {FilterModalTexts.addOrder}
              </LabeledRadio>
              <LabeledRadio
                setSortBy={setSortBy}
                checked={sortBy === SortMethod.alphabetically}
                value={SortMethod.alphabetically}
              >
                {FilterModalTexts.alphabetically}
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
