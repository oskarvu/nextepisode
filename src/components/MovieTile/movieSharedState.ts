import { atomFamily } from 'recoil'

export interface MovieInitState {
  id: number | undefined
  name: string | undefined
  addTime: number | undefined
}

export const movieInitState = atomFamily<MovieInitState, number>({
  key: 'movieInitState',
  default: {
    id: undefined,
    name: undefined,
    addTime: undefined,
  },
})

export const movieFocusOn = atomFamily<boolean, number>({
  key: 'movieFocusOn',
  default: false,
})

export const movieNetwork = atomFamily<string | null, number>({
  key: 'movieNetwork',
  default: null,
})

export const isMovieListed = atomFamily<boolean, number>({
  key: 'isMovieListed',
  default: false,
})

export const timeLeftToAir = atomFamily<number | null, number>({
  key: 'timeLeftToAir',
  default: null,
})
