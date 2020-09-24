import { atomFamily } from 'recoil'

export interface MovieInitData {
  id: string
  name: string
  addTime: number
}

export const movieFocusOn = atomFamily<boolean, string>({
  key: 'movieFocusOn',
  default: false,
})

export const movieNetwork = atomFamily<string | null, string>({
  key: 'movieNetwork',
  default: null,
})

export const timeLeftToAir = atomFamily<number | null, string>({
  key: 'timeLeftToAir',
  default: null,
})
