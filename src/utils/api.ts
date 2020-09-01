import {
  keyField,
  searchURL,
  tvDataURL,
  searchFields,
  tvFields,
} from '../api/config'
import { ApiQueryType, Movie, SearchResult } from '../api/types'

export function getApiURL(query: string | number, type: ApiQueryType): any {
  switch (type) {
    case ApiQueryType.Search:
      return `${searchURL}${keyField}${searchFields}&query=${encodeURI(
        query as string
      )}`
    case ApiQueryType.TV:
      return `${tvDataURL}${query}?${keyField}${tvFields}`
    default:
      return ''
  }
}

export async function fetchFromTMDB(apiQuery: string): Promise<any> {
  try {
    const response = await fetch(apiQuery)
    if (!response.ok) {
      throw new Error(`${response.status}`)
    } else {
      return await response.json()
    }
  } catch (e) {
    console.error(e)
    return []
  }
}

export function parseSearchResult(apiResult: any[]): SearchResult[] {
  return apiResult.map((movieResult) => ({
    name: movieResult.name,
    firstAirDate: movieResult.first_air_date,
    id: movieResult.id,
  }))
}

export function parseToMovie(apiMovie: any): Movie {
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
    id: apiMovie.id,
    backdrop: apiMovie.backdrop_path,
    inProduction: apiMovie.in_production,
    lastAirDate: apiMovie.last_air_date,
    lastEpisode: lastEpisodeToAir,
    nextEpisode: nextEpisodeToAir,
  }
}
