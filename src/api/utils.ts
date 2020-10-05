import { keyField, searchURL, tvDataURL, searchFields, tvFields, trendingURL } from './config'
import { Movie, SearchResult, Status } from './types'

export async function fetchFromTMDB<T>(apiQuery: string, parser: (data: any) => T): Promise<T> {
  const response = await fetch(apiQuery)
  if (!response.ok) {
    throw new Error(`${response.status}`)
  }
  const data = await response.json()
  return Promise.resolve(parser(data))
}

export async function fetchMovieDetails(id: string) {
  const apiQuery = `${tvDataURL}${id}?${keyField}${tvFields}`
  return fetchFromTMDB(apiQuery, parseRawMovieData)
}

export async function fetchMovieSearchResults(inputText: string) {
  if (!inputText) {
    return fetchFromTMDB(trendingURL, parseRawSearchResult)
  }
  const apiQuery = `${searchURL}${keyField}${searchFields}&query=${encodeURI(inputText)}`
  return fetchFromTMDB(apiQuery, parseRawSearchResult)
}

export function parseRawSearchResult(data: any): SearchResult[] {
  return data.results.map((movieResult: any) => ({
    name: movieResult.name,
    firstAirDate: movieResult.first_air_date,
    id: movieResult.id,
  }))
}

export function parseRawMovieData(apiMovie: any): Movie {
  const lastEpisodeToAir = apiMovie?.last_episode_to_air
    ? {
        airDate: apiMovie.last_episode_to_air.air_date,
        episode: apiMovie.last_episode_to_air.episode_number,
        name: apiMovie.last_episode_to_air.name,
        season: apiMovie.last_episode_to_air.season_number,
      }
    : null

  const nextEpisodeToAir = apiMovie?.next_episode_to_air
    ? {
        airDate: apiMovie.next_episode_to_air.air_date,
        episode: apiMovie.next_episode_to_air.episode_number,
        name: apiMovie.next_episode_to_air.name,
        season: apiMovie.next_episode_to_air.season_number,
      }
    : null

  return {
    name: apiMovie.name,
    status: apiMovie.status.toLowerCase(),
    id: apiMovie.id.toString(),
    numberOfSeasons: apiMovie.number_of_seasons,
    network: apiMovie?.networks[0]?.name,
    backdrop: apiMovie.backdrop_path,
    inProduction: apiMovie.in_production,
    lastAirDate: apiMovie.last_air_date,
    lastEpisode: lastEpisodeToAir,
    nextEpisode: nextEpisodeToAir,
  }
}

export function statusOrder(status: string | null) {
  switch (status) {
    case Status.ReturningSeries:
      return 1
    case Status.InProduction:
      return 2
    case Status.Planned:
      return 3
    case Status.Canceled:
      return 4
    case Status.Ended:
      return 5
    default:
      return Infinity
  }
}
