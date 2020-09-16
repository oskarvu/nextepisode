import { useEffect, useState } from 'react'
import { fetchFromTMDB, getApiURL } from '../utils/api'
import { ApiQueryType } from '../api/types'

export default function useTMDBFetch<T>(
  type: ApiQueryType,
  query: string,
  parser: (data: any) => T,
  fetchDelay = 0,
  isLoadingTrigger = 0
) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    if (!query) {
      return
    }
    const timeoutID = setTimeout(() => {
      try {
        const longLoadTimeout = setTimeout(() => {
          setIsLoading(true)
        }, isLoadingTrigger)
        const queryText = getApiURL(query, type)
        fetchFromTMDB(queryText)
          .then((data) => {
            const translated = parser(data)
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
    }, fetchDelay)

    return () => clearTimeout(timeoutID)
  }, [query, type, fetchDelay, parser])
  return { isLoading, isError, error, data }
}
