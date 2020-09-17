import { idMovieShortDataMap, MovieShortData } from '../components/Main'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'

type keySetMovieShortData = keyof MovieShortData

export default function useSetMoviesShortData(
  movieId: number,
  fieldToChange: keySetMovieShortData,
  value: number | string | null
) {
  const setState = useSetRecoilState(idMovieShortDataMap)

  useEffect(() => {
    setState((prev) => {
      const newState = { ...prev }
      newState[movieId] = {
        ...newState[movieId],
        [fieldToChange]: value,
      }
      return newState
    })
  }, [fieldToChange, value, movieId, setState])
}
