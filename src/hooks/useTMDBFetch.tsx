import { useEffect, useState } from 'react'
import {
  fetchFromTMDB,
  getApiURL,
  parseToMovie,
  parseToSearchResult,
} from '../utils/api'
import { ApiQueryType, Movie, SearchResult } from '../api/types'

export default function useTMDBFetch(
  query: string,
  type: ApiQueryType,
  delay = 0
) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<Movie | SearchResult[] | null>(null)

  useEffect(() => {
    if (!query) {
      return
    }
    const timeoutID = setTimeout(() => {
      try {
        const longLoadTimeout = setTimeout(() => {
          setIsLoading(true)
        }, 150)
        const queryText = getApiURL(query, type)
        fetchFromTMDB(queryText)
          .then((data) => {
            const translated =
              type === ApiQueryType.Search
                ? parseToSearchResult(data.results)
                : parseToMovie(data.results)
            setData(translated)
          })
          .finally(() => {
            clearTimeout(longLoadTimeout)
            setIsLoading(false)
          })
      } catch (e) {
        setIsError(true)
        setError(e)
      }
    }, delay)

    return () => clearTimeout(timeoutID)
  }, [query, type, delay])
  return { isLoading, isError, error, data }
}
