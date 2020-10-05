import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { AnimatePresence } from 'framer-motion'

import { SearchBarTexts } from '../../translations/en-US'
import { capitalize } from '../../utils/capitalize'

import { Search } from '../../assets/icons/motionable/Search'
import { X } from '../../assets/icons/motionable/X'
import { Spinner } from '../../assets/icons/motionable/Spinner'
import { Logo } from '../../assets/icons/motionable/Logo'
import { fetchDelay, spinDelay } from '../../api/config'
import { useRecoilState } from 'recoil'
import { isResultsModalVisible } from './sharedState'

const InputContainer = tw.div`
  relative px-4
`

const Input = tw.input`
  h-12 w-full
  px-12 my-4
  rounded-full outline-none bg-gray-200
  text-gray-800 placeholder-gray-600
  leading-6 text-lg font-medium tracking-wide
`

const SpinnerIcon = tw(Spinner)`
  absolute
  w-8 h-8
  ml-3 mt-6
  text-gray-400
`

const spinnerMotionProps = {
  initial: { opacity: 0.5, scale: 0.8 },
  exit: { opacity: 0.5, scale: 0.8 },
  animate: {
    opacity: [0.7, 1, 0.7],
    rotate: 360,
  },
  transition: { duration: 1, ease: 'linear', loop: Infinity },
}

const SearchIcon = tw(Search)`
  absolute
  w-8 h-8
  ml-3 mt-6
  text-gray-400
`

const opacityMotionProps = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: {
    opacity: 1,
  },
}

const CloseIcon = tw(X)`
  absolute
  right-0 mr-8 mt-6 w-8 h-8
  text-gray-500 cursor-pointer
  hover:text-gray-800
`

const StyledLogo = styled(Logo)`
  margin-top: 1.6rem;
  width: 1.7rem;
  height: 1.7rem;
  ${tw`absolute
  right-0 mr-8
  text-red-500`}
`

interface Props {
  setEnableFetch: React.Dispatch<React.SetStateAction<boolean>>
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
}

export function SearchBarInput({ setEnableFetch, inputText, setInputText, isLoading }: Props) {
  const [fetchTimeout, setFetchTimeout] = useState<number>()
  const [spin, setSpin] = useState(false)
  const [isModalVisible, setIsModalVisible] = useRecoilState(isResultsModalVisible)

  useEffect(() => {
    const spinTimout = setTimeout(() => {
      isLoading ? setSpin(true) : setSpin(false)
    }, spinDelay)

    return () => clearTimeout(spinTimout)
  }, [isLoading])

  return (
    <InputContainer>
      <AnimatePresence>
        {spin ? (
          <SpinnerIcon iconLabel="spinner" {...spinnerMotionProps} />
        ) : (
          <label htmlFor="search-input">
            <SearchIcon onClick={() => {}} iconLabel="search" />
          </label>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isModalVisible ? (
          <CloseIcon
            iconLabel="close"
            {...opacityMotionProps}
            onClick={() => {
              setIsModalVisible(false)
              setInputText('')
            }}
          />
        ) : (
          <StyledLogo iconLabel="logo" {...opacityMotionProps} />
        )}
      </AnimatePresence>
      <Input
        id="search-input"
        type="text"
        value={inputText}
        placeholder={capitalize(SearchBarTexts.searchForTvShow) + '...'}
        onKeyUp={handleOnKeyUp}
        onKeyDown={handleOnKeydown}
        onClick={handleOnClickOrOnFocus}
        onFocus={handleOnClickOrOnFocus}
        onChange={handleOnChange}
      />
    </InputContainer>
  )

  function handleOnClickOrOnFocus() {
    setEnableFetch(true)
    setIsModalVisible(true)
  }

  function handleOnKeyUp(event: React.KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      setIsModalVisible(false)
    }
  }

  function handleOnKeydown(event: React.KeyboardEvent) {
    if (!inputText) {
      switch (event.key) {
        case 'Backspace':
          setIsModalVisible(false)
          break
        case 'Enter':
          setIsModalVisible(true)
          break
      }
    }
  }

  function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
    const eventInputText = (event.target as HTMLInputElement).value
    setInputText(eventInputText)
    clearTimeout(fetchTimeout)
    setEnableFetch(false)
    if (!eventInputText) {
      setIsModalVisible(false)
      return
    }
    const fetchTimeoutId = setTimeout(() => {
      setEnableFetch(true)
    }, fetchDelay)
    setFetchTimeout(fetchTimeoutId)
  }
}
