import React from 'react'
import tw, { styled } from 'twin.macro'
import { Sort } from './FiltersModal'
import { SetterOrUpdater } from 'recoil'

const RadioInput = tw.input`
  appearance-none h-2 w-2 ml-1
  border border-gray-500 rounded-full cursor-pointer
  bg-white checked:border-gray-600 checked:bg-red-500 focus:outline-none
`

const Label = styled.label(({ hasChecked }: { hasChecked: boolean }) => [
  tw`bg-gray-300 p-2 first:pl-3 first:rounded-l-full last:rounded-r-full cursor-pointer hover:bg-gray-200
  text-xs uppercase font-bold text-gray-800 tracking-wide border-gray-400 border-r-2 last:border-r-0`,
  hasChecked && tw`bg-gray-200 text-gray-700`,
])

interface Props {
  checked: boolean
  value: Sort
  setSortBy: SetterOrUpdater<Sort>
}

export const LabeledCheckbox: React.FC<Props> = ({ checked, value, setSortBy, children }) => {
  return (
    <Label hasChecked={checked}>
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
    setSortBy(event.target.value as Sort)
  }
}
