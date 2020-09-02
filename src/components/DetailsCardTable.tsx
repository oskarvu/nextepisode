import { Movie } from '../api/types'
import React from 'react'
import tw from 'twin.macro'

const Cell = tw.div`
  flex flex-grow justify-center
  px-3 py-2
  border border-gray-300 border-4 first:border-r-0 last:border-l-0
  uppercase text-sm font-bold text-gray-600 tracking-wider
`

const Row = tw.div`
  hidden sm:flex flex-row
  w-full
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

function formatDate(isoDateString: string): string {
  return new Date(isoDateString).toLocaleDateString('en-US')
}

export default function DetailsCardTable({ movie }: { movie: Movie }) {
  return movie?.nextEpisode ? (
    <Row>
      <Cell>next</Cell>
      <Cell>
        <SeasonEpisode
          season={movie.nextEpisode.season}
          episode={movie.nextEpisode.episode}
        />
      </Cell>
      <Cell>{formatDate(movie.nextEpisode.airDate)}</Cell>
    </Row>
  ) : (
    movie?.lastEpisode && (
      <Row>
        <Cell>last</Cell>
        <Cell>
          <SeasonEpisode
            season={movie.lastEpisode.season}
            episode={movie.lastEpisode.episode}
          />
        </Cell>
        <Cell>{formatDate(movie.lastEpisode.airDate)}</Cell>
      </Row>
    )
  )
}
