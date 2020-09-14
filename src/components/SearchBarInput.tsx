import React from 'react'
import tw from 'twin.macro'
import { AnimatePresence } from 'framer-motion'

import Search from '../assets/icons/motionable/Search'
import X from '../assets/icons/motionable/X'
import Spinner from '../assets/icons/motionable/Spinner'

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
  initial: { opacity: 0, scale: 0.8 },
  exit: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0.3, 1, 0.3],
    rotate: 360,
  },
  transition: { duration: 1.2, ease: 'linear', loop: Infinity },
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
  right-0 mr-6 mt-6 w-8 h-8
  text-gray-500 cursor-pointer
  hover:text-gray-800
`

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
}

// todo: handle errors from api
export default function SearchBarInput({
  setModalVisible,
  inputText,
  setInputText,
  isLoading,
}: Props) {
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
    setInputText((event.target as HTMLInputElement).value)
  }

  return (
    <InputContainer>
      <AnimatePresence>
        {isLoading ? (
          <SpinnerIcon {...spinnerMotionProps} />
        ) : (
          <SearchIcon {...opacityMotionProps} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {inputText && (
          <CloseIcon
            {...opacityMotionProps}
            onClick={() => {
              setModalVisible(false)
              setInputText('')
            }}
          />
        )}
      </AnimatePresence>
      <Input
        type="text"
        value={inputText}
        placeholder="Search for a tv show..."
        onKeyUp={handleOnKeyUp}
        onClick={handleClick}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
      />
    </InputContainer>
  )
}
