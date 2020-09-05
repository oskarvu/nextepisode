import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'

import { fetchFromTMDB, getApiURL, parseSearchResult } from '../utils/api'
import { fetchDelay } from '../api/config'
import { ApiQueryType, SearchResult } from '../api/types'

import Search from '../assets/icons/Search'
import X from '../assets/icons/X'
import Spinner from '../assets/icons/Spinner'
import { AnimatePresence, motion } from 'framer-motion'

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

const wrapperBase = `
  absolute
  w-8 h-8
  ml-3 mt-6
`

const SearchWrapper = tw(motion.div)`${wrapperBase}`

const SearchIcon = tw(Search)`
  text-gray-400
`

const CloseIcon = tw(X)`
  absolute
  right-0 mr-6 mt-6 w-8 h-8
  text-gray-500 cursor-pointer
  hover:text-gray-800
`

const SpinnerWrapper = tw(motion.div)`${wrapperBase}`

const SpinnerIcon = tw(Spinner)`
  text-gray-400
`

interface Props {
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
}

// todo: handle errors from api
// todo: some timeout on promise
// todo: make spinner when looking in api
export default function SearchBarInput({
  setResults,
  setModalVisible,
  inputText,
  setInputText,
}: Props) {
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

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

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      if (!inputText) {
        setResults([])
        return
      }
      try {
        setLoading(true)
        const queryText = getApiURL(inputText, ApiQueryType.Search)
        fetchFromTMDB(queryText).then((data) => {
          const translated = parseSearchResult(data.results)
          setResults(translated)
          setLoading(false)
          setModalVisible(true)
        })
      } catch (e) {
        setError(true)
      }
    }, fetchDelay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [inputText, setResults, setModalVisible])

  return (
    <InputContainer>
      {isLoading ? (
        <AnimatePresence>
          <SpinnerWrapper
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              rotate: 360,
            }}
            transition={{ duration: 1.2, ease: 'linear', loop: Infinity }}
          >
            <SpinnerIcon />
          </SpinnerWrapper>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <SearchWrapper
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
          >
            <SearchIcon />
          </SearchWrapper>
        </AnimatePresence>
      )}
      {inputText && (
        <CloseIcon
          onClick={() => {
            setModalVisible(false)
            setInputText('')
          }}
        />
      )}
      <Input
        type="text"
        value={isError ? inputText : 'error text'}
        placeholder="Search for a tv show..."
        onKeyUp={handleOnKeyUp}
        onClick={handleClick}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
      />
    </InputContainer>
  )
}
