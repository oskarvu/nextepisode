import React, { useEffect } from 'react'
import tw from 'twin.macro'

import { fetchFromTMDB, getApiURL, parseSearchResult } from '../utils/api'
import { fetchDelay } from '../api/config'
import { ApiQueryType, SearchResult } from '../api/types'

import Search from '../assets/icons/Search'
import X from '../assets/icons/X'

const InputContainer = tw.div`
  relative px-4
`

const Input = tw.input`
  h-12 w-full
  px-12 pb-1 my-4
  rounded-full outline-none bg-gray-200
  text-gray-700 placeholder-gray-400
  leading-6 text-lg font-medium tracking-wide
`

const SearchIcon = tw(Search)`
  absolute
  w-8 h-8
  ml-3 mt-6
  text-gray-500
`

const CloseIcon = tw(X)`
  absolute
  right-0 mr-6 mt-6 w-8 h-8
  text-gray-500 cursor-pointer
  hover:text-gray-800
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
      const queryText = getApiURL(inputText, ApiQueryType.Search)
      fetchFromTMDB(queryText).then((data) => {
        const translated = parseSearchResult(data.results)
        setResults(translated)
        setModalVisible(true)
      })
    }, fetchDelay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [inputText, setResults, setModalVisible])

  return (
    <InputContainer>
      <SearchIcon />
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
