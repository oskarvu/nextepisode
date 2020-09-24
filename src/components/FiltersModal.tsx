import React from 'react'
import { atom, useSetRecoilState } from 'recoil'

export enum Sort {
  alphabetically = 'alphabetically',
  byPremiere = 'by-premiere',
  byAddTime = 'by-add-time',
}

export const sortMethod = atom<Sort>({
  key: 'sortMethod',
  default: Sort.alphabetically,
})

export const FiltersModal: React.FC<any> = ({ children }) => {
  const setSortMethod = useSetRecoilState(sortMethod)
  return (
    <div onChange={handleOnChange}>
      <label htmlFor={Sort.alphabetically}>alphabetically</label>
      <input id={Sort.alphabetically} value={Sort.alphabetically} type="radio" name="filter" />
      <label htmlFor={Sort.byPremiere}>by premiere</label>
      <input id={Sort.byPremiere} value={Sort.byPremiere} type="radio" name="filter" />
      <label htmlFor={Sort.byAddTime}>by add time</label>
      <input id={Sort.byAddTime} value={Sort.byAddTime} type="radio" name="filter" />
    </div>
  )

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSortMethod(event.target.value as Sort)
  }
}
