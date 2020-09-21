import { atom } from 'recoil'
import { MovieInitState } from '../components/MovieTile/movieSharedState'

type IdMovieInitStateMap = Record<number, MovieInitState>

const stored = localStorage.getItem('storage')

export const movieIds = atom<number[]>({
  key: 'movieIds',
  default: stored ? JSON.parse(stored)?.ids : [],
})

export const movieFilteredIds = atom<number[]>({
  key: 'movieFilteredIds',
  default: stored ? JSON.parse(stored)?.filteredIds : [],
})

export const toStoreMovieInitState = atom<IdMovieInitStateMap>({
  key: 'toStoreMovieInitState',
  default: stored ? JSON.parse(stored)?.movieInitData : [],
})
