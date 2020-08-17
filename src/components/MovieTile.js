import React from 'react'
import tw, { styled } from 'twin.macro'

const Tile = styled.div(({ backdrop }) => [
  tw`
    w-95 h-56
    mt-6
    bg-white rounded-xl bg-cover
  `,
  `background-image: url("https://image.tmdb.org/t/p/w1280/${backdrop}")`,
])

function MovieTile(props) {
  return <Tile {...props}>{props.title}</Tile>
}

export default MovieTile