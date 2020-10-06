import { atom } from 'recoil'
import { SortMethod } from './types'
import { LocalDBKeys } from '../../db/types'

const StoredSortMethod = localStorage.getItem(LocalDBKeys.sortMethod)

export const SortByMethod = atom<SortMethod>({
  key: 'sortByMethod',
  default: StoredSortMethod ? JSON.parse(StoredSortMethod) : SortMethod.byAddTime,
})

export const isFilterModalExpanded = atom<boolean>({
  key: 'isFilterModalExpanded',
  default: false,
})
