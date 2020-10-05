import React from 'react'
import tw from 'twin.macro'

import { CommonTexts } from '../../translations/en-US'

import { Movie } from '../../api/types'

const Cell = tw.div`
  flex flex-grow justify-center
  px-2 py-1 sm:py-1
  uppercase text-sm font-bold text-gray-600 tracking-wider
  border border-gray-300 border-4 first:border-r-0 last:border-l-0
`

const Row = tw.div`
  flex flex-row
  w-full
`

export function DetailsCardTable({ movie }: { movie: Movie }) {
  return movie?.nextEpisode ? (
    <Row>
      <Cell>{CommonTexts.next}</Cell>
      <Cell>
        <SeasonEpisode season={movie.nextEpisode.season} episode={movie.nextEpisode.episode} />
      </Cell>
      <Cell>{formatDate(movie.nextEpisode.airDate)}</Cell>
    </Row>
  ) : (
    movie?.lastEpisode && (
      <Row>
        <Cell>{CommonTexts.last}</Cell>
        <Cell>
          <SeasonEpisode season={movie.lastEpisode.season} episode={movie.lastEpisode.episode} />
        </Cell>
        <Cell>{formatDate(movie.lastEpisode.airDate)}</Cell>
      </Row>
    )
  )
}

function SeasonEpisode({ season, episode }: { season: number; episode: number }) {
  return (
    <span>
      {'s' + season.toString().padStart(2, '0') + 'e' + episode.toString().padStart(2, '0')}
    </span>
  )
}

function formatDate(isoDateString: string): string {
  return new Date(isoDateString).toLocaleDateString()
}
