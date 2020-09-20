import { atom, selector } from 'recoil'
import {
  clickedMovieId,
  MovieSharedState,
  movieSharedState,
} from '../components/MovieTile/movieSharedState'

export const movieIds = atom<number[]>({
  key: 'movieIdList',
  default: [],
})

export const iteratedMovieFilterDataId = atom<number>({
  key: 'currentMovieFilterDataId',
  default: -1,
})

export const selectIteratedMovieFilterData = selector<MovieSharedState>({
  key: 'selectMovieFilterData',
  get: ({ get }) => {
    const id = get(iteratedMovieFilterDataId)
    return get(movieSharedState(id))
  },
})
