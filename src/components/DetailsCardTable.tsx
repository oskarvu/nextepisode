import { Movie } from '../api/types'
import React from 'react'
import tw from 'twin.macro'

const Cell = tw.td`
  px-3 py-2
  border border-gray-300 border-4 
  uppercase text-sm font-bold text-gray-600 tracking-wider
`

const Table = tw.table`
  hidden sm:block w-full
`

function SeasonEpisode({
  season,
  episode,
}: {
  season: number
  episode: number
}) {
  return (
    <span>
      {'s' +
        season.toString().padStart(2, '0') +
        'e' +
        episode.toString().padStart(2, '0')}
    </span>
  )
}

export default function DetailsCardTable({ movie }: { movie: Movie }) {
  return (
    <Table>
      <tbody>
        {movie?.nextEpisode ? (
          <tr>
            <Cell>next</Cell>
            <Cell>
              <SeasonEpisode
                season={movie.nextEpisode.season}
                episode={movie.nextEpisode.episode}
              />
            </Cell>
            <Cell>{movie.nextEpisode.airDate}</Cell>
          </tr>
        ) : (
          movie?.lastEpisode && (
            <tr>
              <Cell>last</Cell>
              <Cell>
                <SeasonEpisode
                  season={movie.lastEpisode.season}
                  episode={movie.lastEpisode.episode}
                />
              </Cell>
              <Cell>{movie.lastEpisode?.airDate}</Cell>
            </tr>
          )
        )}
      </tbody>
    </Table>
  )
}
