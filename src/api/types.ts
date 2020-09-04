export interface Episode {
  airDate: string
  episode: number
  name: string
  season: number
}

export interface Movie {
  name: string
  status: string
  id: number
  backdrop: string | null
  inProduction: boolean
  lastAirDate: string | null
  lastEpisode: Episode | null
  nextEpisode: Episode | null
}

export interface SearchResult {
  name: string
  firstAirDate: string
  id: number
}

export enum Status {
  Rumored = 'rumored',
  Planned = 'planned',
  InProduction = 'in production',
  PostProduction = 'post production',
  Released = 'released',
  Canceled = 'canceled',
  ReturningSeries = 'returning series',
  Ended = 'ended',
  Planed = 'planned',
}

export enum CounterFollow {
  dayLeft = 'day left',
  daysLeft = 'days left',
  monthLeft = 'month left',
  monthsLeft = 'months left',
  noInfo = 'no info yet',
  today = 'today',
}

export enum ApiQueryType {
  Search = 'search',
  TV = 'tv',
}
