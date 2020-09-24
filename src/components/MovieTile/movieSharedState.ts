import { atomFamily, selectorFamily } from 'recoil'

export interface MovieInitData {
  id: string
  name: string
  addTime: number
}

const focusOn = atomFamily<boolean, string>({
  key: 'focusOn',
  default: false,
})

const network = atomFamily<string | null, string>({
  key: 'network',
  default: null,
})

const leftToAir = atomFamily<number | null, string>({
  key: 'leftToAir',
  default: null,
})

export const movieFocusOn = selectorFamily<boolean, string>({
  key: 'movieFocusOn',
  get: (param) => ({ get }) => get(focusOn(`focusOn${param}`)),
  set: (param) => ({ set }, newValue) => set(focusOn(`focusOn${param}`), newValue),
})

export const movieNetwork = selectorFamily<string | null, string>({
  key: 'movieNetwork',
  get: (param) => ({ get }) => get(network(`networkOf${param}`)),
  set: (param) => ({ set }, newValue) => set(network(`networkOf${param}`), newValue),
})

export const timeLeftToAir = selectorFamily<number | null, string>({
  key: 'timeLeftToAir',
  get: (param) => ({ get }) => get(leftToAir(`timeLeftOf${param}`)),
  set: (param) => ({ set }, newValue) => set(leftToAir(`timeLeftOf${param}`), newValue),
})
