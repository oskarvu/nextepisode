import React from 'react'
import tw from 'twin.macro'
import { SetterOrUpdater } from 'recoil'

import { SortMethod } from './types'

const RadioInput = tw.input`
  appearance-none h-2 w-2 ml-1
  border border-gray-500 rounded-full cursor-pointer
  bg-white checked:border-gray-600 checked:bg-red-500 focus:outline-none
`

const Label = tw.label`
  p-2 first:pl-3
  border-gray-400 border-r-2 first:rounded-l-full last:border-r-0 last:rounded-r-full
  hover:bg-gray-200 bg-gray-300 cursor-pointer
  text-xs sm:text-sm uppercase font-bold text-gray-800 tracking-wide
`

interface Props {
  checked: boolean
  value: SortMethod
  setSortBy: SetterOrUpdater<SortMethod>
  children: React.ReactNode
}

export function LabeledRadio({ checked, value, setSortBy, children }: Props) {
  return (
    <Label>
      {children}
      <RadioInput
        type="radio"
        checked={checked}
        onChange={handleOnChange}
        id={value}
        value={value}
      />
    </Label>
  )

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSortBy(event.target.value as SortMethod)
  }
}
