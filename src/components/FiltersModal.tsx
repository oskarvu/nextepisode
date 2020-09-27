import React, { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import tw from 'twin.macro'
import { LocalStorage } from '../db/types'

const Modal = tw.div`
  fixed bottom-0 mb-4 bg-white p-4 rounded-4xl
`

const RadioInput = tw.input`
  appearance-none h-3 w-3 ml-1 mb-1
  border border-gray-400 rounded-full cursor-pointer
  bg-white checked:border-gray-700 checked:bg-gray-500 focus:outline-none
  align-middle
`

const Label = tw.label`
  bg-gray-200 p-2 first:pl-3 first:rounded-l-full last:rounded-r-full cursor-pointer
  text-xs uppercase font-bold text-gray-800 tracking-wider border-gray-400 border-2 border-r-0 last:border-r-2
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

  useEffect(() => {
    localStorage.setItem(LocalStorage.sortMethod, JSON.stringify(sortBy))
  }, [sortBy])

  return (
    <Modal onChange={handleOnChange}>
      <Label>
        A-Z
        <RadioInput
          id={Sort.alphabetically}
          value={Sort.alphabetically}
          type="radio"
          name="filter"
        />
      </Label>
      <Label>
        Time left
        <RadioInput id={Sort.byPremiere} value={Sort.byPremiere} type="radio" name="filter" />
      </Label>
      <Label>
        Add order
        <RadioInput id={Sort.byAddTime} value={Sort.byAddTime} type="radio" name="filter" />
      </Label>
    </Modal>
  )

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSortBy(event.target.value as Sort)
  }
}
