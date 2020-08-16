import React from 'react'
import tw from 'twin.macro'

const Tile = tw.div`
  w-95 h-56
  mt-6
  bg-white rounded-xl
`

function MovieTile({ title }) {
  return <Tile>{title}</Tile>
}

export default MovieTile
