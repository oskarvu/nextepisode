import { atomFamily } from 'recoil'

export interface MovieInitData {
  id: number | undefined
  name: string | undefined
  addTime: number | undefined
}

export const movieFocusOn = atomFamily<boolean, number>({
  key: 'movieFocusOn',
  default: false,
})

export const movieNetwork = atomFamily<string | null, number>({
  key: 'movieNetwork',
  default: null,
})

export const timeLeftToAir = atomFamily<number | null, number>({
  key: 'timeLeftToAir',
  default: null,
})
