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

export interface Episode {
  airDate: string
  episode: number
  name: string
  season: number
}

export interface Movie {
  name: string
  status: string
  id: string
  numberOfSeasons: number
  network: string | null
  backdrop: string | null
  inProduction: boolean
  lastAirDate: string | null
  lastEpisode: Episode | null
  nextEpisode: Episode | null
}

export interface SearchResult {
  name: string
  firstAirDate: string
  id: string
}

export enum ApiQueryType {
  Search = 'search',
  TV = 'tv',
}
