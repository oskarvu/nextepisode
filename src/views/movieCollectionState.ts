import { atom } from 'recoil'
import { MovieInitData } from '../components/MovieTile/movieSharedState'
import { LocalStorage } from '../db/types'

const ids = localStorage.getItem(LocalStorage.idArray)
const filteredIds = localStorage.getItem(LocalStorage.filteredIdArray)
const idMovieMap = localStorage.getItem(LocalStorage.idMovieInitDataMap)

export const movieIds = atom<number[]>({
  key: 'movieIds',
  default: ids ? JSON.parse(ids) : [],
})

export const movieFilteredIds = atom<number[]>({
  key: 'movieFilteredIds',
  default: filteredIds ? JSON.parse(filteredIds) : [],
})

export const idMovieInitDataMap = idMovieMap
  ? new Map<number, MovieInitData>(JSON.parse(idMovieMap))
  : new Map<number, MovieInitData>()
