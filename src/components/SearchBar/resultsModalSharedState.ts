import { atom } from 'recoil'

export const isResultsModalVisible = atom<boolean>({
  key: 'isResultsModalVisible',
  default: false,
})
