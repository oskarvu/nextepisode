import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import Search from '../assets/icons/Search'
import X from '../assets/icons/X'
import { fetchFromTMDB, getApiURL } from '../utils/api'
import apiConfig from '../api/config'

const InputContainer = tw.div`
  relative
`

const Input = tw.input`
  w-95 h-12
  px-6 pb-1 pl-12 my-4
  rounded-full outline-none bg-gray-200
  text-gray-700 placeholder-gray-400
  leading-6 text-lg font-medium tracking-wide
`

const SearchIcon = tw(Search)`
  absolute
  w-8 h-8 ml-8 mt-6
  text-gray-500
`

const CloseIcon = tw(X)`
  absolute
  right-0 mr-8 mt-6 w-8 h-8
  text-gray-500 cursor-pointer
  hover:text-gray-800
`

function SearchBarInput({
  setResults,
  setModalVisible,
  inputText,
  setInputText,
}) {
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      if (!inputText) {
        setResults([])
        return
      }
      const queryText = getApiURL(inputText, apiConfig.queryType.SEARCH)
      fetchFromTMDB(queryText).then((data) => {
        setResults(data.results)
      })
    }, apiConfig.fetchDelay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [inputText, setResults])

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
        placeholder="Search for a movie or a tv show..."
        onKeyDown={(e) =>
          e.keyCode === 27 ? setModalVisible(false) : setModalVisible(true)
        }
        onClick={() => setModalVisible(true)}
        onFocus={() => {
          setModalVisible(true)
        }}
        onChange={(event) => setInputText(event.target.value)}
      />
    </InputContainer>
  )
}

export default SearchBarInput
