import React, { useContext } from 'react'
import tw, { styled } from 'twin.macro'

import Trash from '../assets/icons/Trash'
import { MoviesContext } from './Main'

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
    w-1/2 h-full pb-8 pt-5 px-5 relative flex flex-col justify-center items-center
  `

const Countdown = tw.div`
  flex justify-center items-center
  w-28 h-28 rounded-full
  bg-gray-800 bg-opacity-80 shadow-md
  text-white font-thin text-6xl pb-2
`

const Unit = tw.div`
  absolute bottom-0 flex justify-center items-center
  px-2 mb-8
  bg-gray-400 bg-opacity-75 rounded-full shadow-md
  text-gray-800 font-bold text-sm tracking-wider uppercase
`

const RightContainer = tw.div`
  flex justify-end
  w-1/2 h-full
  py-5 pr-6
`

const Details = tw.div`
  relative inline-flex justify-between flex-col
  h-full p-3 pt-1
  bg-white shadow-lg
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
  const [movies, setMovies] = useContext(MoviesContext)

  const movieInfo = {
    backdrop: movie.backdrop_path,
    name: movie.name,
    lastEpisode: movie.last_episode_to_air,
    nextEpisode: movie.next_episode_to_air,
    inProduction: movie.in_production,
    status: movie.status,
    movieId: movie.id,
  }

  const {
    backdrop,
    name,
    lastEpisode,
    nextEpisode,
    inProduction,
    status,
    movieId,
  } = movieInfo

  return (
    <Tile backdrop={backdrop}>
      <LeftContainer>
        <Countdown>12</Countdown>
        <Unit>days left</Unit>
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
                  s{lastEpisode.season_number.toString().padStart(2, '0')}e
                  {lastEpisode.episode_number.toString().padStart(2, '0')}
                </Td>
                <Td>{lastEpisode.air_date}</Td>
              </tr>
            </tbody>
          </table>
          <TrashIcon
            onClick={() => {
              setMovies(movies.filter((m) => m.id !== movieId))
            }}
          />
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
