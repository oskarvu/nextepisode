import React from 'react'
import tw, { styled } from 'twin.macro'

import Trash from '../assets/icons/Trash'

const Tile = styled.div(({ backdrop }) => [
  tw`
    flex justify-between
    w-95 h-56 mt-6
    rounded-4xl
    overflow-hidden
    bg-cover bg-center
  `,
  `box-shadow: inset 0 0 20px 0 rgba(0,0,0,0.5);`,
  `background-image: url("https://image.tmdb.org/t/p/w1280/${backdrop}");`,
])

const LeftContainer = tw.div`
    w-1/2 h-full pb-8 pt-5 px-5 flex justify-center items-center
    text-white text-center text-4xl font-semibold leading-tight
  `

const InfoRibbon = tw.div`
  flex justify-between
  w-full h-16 text-white
`

const RightContainer = tw.div`
  flex justify-end
  w-1/2 h-full
  py-5 pr-6
`

const Details = tw.div`
  relative inline-flex justify-between flex-col
  h-full p-3 pt-1
  bg-white shadow-2xl
`

const MovieName = tw.h1`
  ml-1 my-1
  text-3xl font-bold text-gray-700 leading-tight
`

const AdditionalInfoBadge = tw.div`
  inline-block
  px-2 py-1 mr-1
  bg-gray-300 rounded-full
  text-xs uppercase font-bold text-gray-600 tracking-wider
`

const Td = tw.td`
  px-3 py-2
  border border-gray-300 border-4 
  uppercase text-sm font-bold text-gray-600 tracking-wider
`

const TrashIcon = tw(Trash)`
  absolute right-0
  w-8 h-8 p-1
  cursor-pointer text-gray-500 hover:text-gray-700
`

//todo: dynamically change font size depending on number of words
function MovieTile({ movie }) {
  const movieInfo = {
    backdrop: movie.backdrop_path,
    name: movie.name,
    lastEpisode: movie.last_episode_to_air,
    nextEpisode: movie.next_episode_to_air,
    inProduction: movie.in_production,
    status: movie.status,
  }

  const {
    backdrop,
    name,
    lastEpisode,
    nextEpisode,
    inProduction,
    status,
  } = movieInfo

  return (
    <Tile backdrop={backdrop}>
      <LeftContainer>
        <InfoRibbon>
          <div>next</div>
          <div>5</div>
          <div>s01e02</div>
        </InfoRibbon>
      </LeftContainer>
      <RightContainer>
        <Details>
          <div>
            <MovieName>{name}</MovieName>
            <AdditionalInfoBadge>{status}</AdditionalInfoBadge>{' '}
            {inProduction && (
              <AdditionalInfoBadge>in production</AdditionalInfoBadge>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <Td>last aired</Td>
                <Td>
                  s{lastEpisode.season_number}e{lastEpisode.episode_number}
                </Td>
                <Td>{lastEpisode.air_date}</Td>
              </tr>
            </tbody>
          </table>
          <TrashIcon />
        </Details>
      </RightContainer>
    </Tile>
  )
}

export default MovieTile

// <table tw="table-auto">
//   <tbody>
//   <tr>
//   <td tw="border px-4 py-2">
//   next
// {nextEpisode &&
// `: s${nextEpisode.season_number}e${nextEpisode.episode_number}`}
// </td>
// <td tw="border px-4 py-2">
// {nextEpisode ? nextEpisode.air_date : 'not yet known'}
// </td>
// <td></td>
// </tr>
// <tr>
// <td tw="border px-4 py-2">
// last aired: s{lastEpisode.season_number}e
// {lastEpisode.episode_number}
// </td>
// <td tw="border px-4 py-2">{lastEpisode.air_date}</td>
// </tr>
// <tr>
// <td tw="border px-4 py-2">in production</td>
// <td tw="border px-4 py-2">{inProduction ? 'yes' : 'no'}</td>
// </tr>
// </tbody>
// </table>
