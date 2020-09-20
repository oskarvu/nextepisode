import { atomFamily, atom, selectorFamily, selector, RecoilValue, RecoilState } from 'recoil'
import { iteratedMovieFilterDataId } from '../../views/movieCollectionState'

export type MovieSharedState = {
  id: number | undefined
  name: string | undefined
  addTime: number | undefined
  timeLeftToAir: number | null
  network: string | null
  listed: boolean
}

export const movieSharedState = atomFamily<MovieSharedState, number>({
  key: 'movieSharedState',
  default: {
    id: undefined,
    name: undefined,
    addTime: undefined,
    timeLeftToAir: null,
    network: null,
    listed: false,
  },
})

export const clickedMovieId = atom<number>({
  key: 'clickedMovieId',
  default: -1,
})

export const isMovieResultClicked = atomFamily<boolean, number>({
  key: 'isMovieResultClicked',
  default: false,
})

export const clickedMovieState = selector<MovieSharedState>({
  key: 'clickedMovieState',
  get: ({ get }) => {
    const id = get(clickedMovieId)
    return get(movieSharedState(id))
  },
  set: ({ set, get }, newStateValue) => {
    const id = get(clickedMovieId)
    set(movieSharedState(id), newStateValue)
  },
})
