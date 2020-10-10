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

const status = atomFamily<string | null, string>({
  key: 'status',
  default: null,
})

export const movieFocusOn = selectorFamily<boolean, string>({
  key: 'movieFocusOn',
  get: (id) => ({ get }) => get(focusOn(`focusOn${id}`)),
  set: (id) => ({ set }, newValue) => set(focusOn(`focusOn${id}`), newValue),
})

export const movieNetwork = selectorFamily<string | null, string>({
  key: 'movieNetwork',
  get: (id) => ({ get }) => get(network(`networkOf${id}`)),
  set: (id) => ({ set }, newValue) => set(network(`networkOf${id}`), newValue),
})

export const timeLeftToAir = selectorFamily<number | null, string>({
  key: 'timeLeftToAir',
  get: (id) => ({ get }) => get(leftToAir(`timeLeftOf${id}`)),
  set: (id) => ({ set }, newValue) => set(leftToAir(`timeLeftOf${id}`), newValue),
})

export const movieStatus = selectorFamily<string | null, string>({
  key: 'movieStatus',
  get: (id) => ({ get }) => get(status(`statusOf${id}`)),
  set: (id) => ({ set }, newValue) => set(status(`statusOf${id}`), newValue),
})
