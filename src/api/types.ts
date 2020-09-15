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
  id: number
}

export enum ApiQueryType {
  Search = 'search',
  TV = 'tv',
}
