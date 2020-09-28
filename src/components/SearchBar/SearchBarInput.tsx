import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { AnimatePresence } from 'framer-motion'

import { Texts } from '../../translations/en-US'
import capitalize from '../../utils/capitalize'

import Search from '../../assets/icons/motionable/Search'
import X from '../../assets/icons/motionable/X'
import Spinner from '../../assets/icons/motionable/Spinner'
import Logo from '../../assets/icons/motionable/Logo'
import { fetchDelay, spinDelay } from '../../api/config'

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

const StyledLogo = styled(Logo)(() => [
  tw`absolute
  right-0 mr-8 w-8 h-8
  text-red-500`,
  'margin-top: 1.4rem',
])

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setEnableFetch: React.Dispatch<React.SetStateAction<boolean>>
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
}

// todo: handle errors from api
// todo: correct spinner fire up time
export default function SearchBarInput({
  setModalVisible,
  setEnableFetch,
  inputText,
  setInputText,
  isLoading,
}: Props) {
  const [fetchTimeout, setFetchTimeout] = useState<number>()
  const [spin, setSpin] = useState(false)

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
          <SpinnerIcon trigger={isLoading} {...spinnerMotionProps} />
        ) : (
          <label htmlFor="search-input">
            <SearchIcon title="search" />
          </label>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {inputText ? (
          <CloseIcon
            title="close"
            {...opacityMotionProps}
            onClick={() => {
              setModalVisible(false)
              setInputText('')
            }}
          />
        ) : (
          <StyledLogo {...opacityMotionProps} />
        )}
      </AnimatePresence>
      <Input
        id="search-input"
        type="text"
        value={inputText}
        placeholder={capitalize(Texts.searchForTvShow) + '...'}
        onKeyUp={handleOnKeyUp}
        onClick={handleClick}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
      />
    </InputContainer>
  )

  function handleClick() {
    inputText && setModalVisible(true)
  }

  function handleOnKeyUp(event: React.KeyboardEvent) {
    event.key === 'Escape' || event.key === 'Esc'
      ? setModalVisible(false)
      : !inputText && setModalVisible(false)
  }

  function handleOnFocus() {
    inputText && setModalVisible(true)
  }

  function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
    clearTimeout(fetchTimeout)
    setInputText((event.target as HTMLInputElement).value)
    const fetchTimeoutId = setTimeout(() => {
      setEnableFetch(true)
    }, fetchDelay)
    setFetchTimeout(fetchTimeoutId)
    setEnableFetch(false)
  }
}
