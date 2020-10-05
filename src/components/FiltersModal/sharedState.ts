import { atom } from 'recoil'
import { SortMethod } from './types'
import { LocalStorage } from '../../db/types'

// todo: refactor like it was real db
const StoredSortMethod = localStorage.getItem(LocalStorage.sortMethod)

export const SortByMethod = atom<SortMethod>({
  key: 'sortByMethod',
  default: StoredSortMethod ? JSON.parse(StoredSortMethod) : SortMethod.byAddTime,
})

export const isFilterModalExpanded = atom<boolean>({
  key: 'isFilterModalExpanded',
  default: false,
})
