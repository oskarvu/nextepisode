import React from 'react'

enum Filters {
  alphabetically = 'alphabetically',
  byPremiere = 'by-premiere',
  byAddTime = 'by-add-time',
}

export const FiltersModal: React.FC<any> = ({ children }) => {
  return (
    <div onChange={handleOnChange}>
      <label htmlFor={Filters.alphabetically}>alphabetically</label>
      <input
        id={Filters.alphabetically}
        value={Filters.alphabetically}
        type="radio"
        name="filter"
      />
      <label htmlFor={Filters.byPremiere}>by premiere</label>
      <input id={Filters.byPremiere} value={Filters.byPremiere} type="radio" name="filter" />
      <label htmlFor={Filters.byAddTime}>by add time</label>
      <input id={Filters.byAddTime} value={Filters.byAddTime} type="radio" name="filter" />
    </div>
  )

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value)
  }
}
