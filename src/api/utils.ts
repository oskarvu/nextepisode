import { keyField, searchURL, tvDataURL, searchFields, tvFields } from './config'
import { Movie, SearchResult } from './types'

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

export async function fetchMovieSearchResults(query: string) {
  if (!query) {
    return Promise.resolve([])
  }
  const apiQuery = `${searchURL}${keyField}${searchFields}&query=${encodeURI(query)}`
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
    status: apiMovie.status,
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
