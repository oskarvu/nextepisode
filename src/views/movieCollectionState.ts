import { atom, selector } from 'recoil'
import { MovieInitData, timeLeftToAir } from '../components/MovieTile/movieSharedState'
import { LocalStorage } from '../db/types'
import { Sort, sortMethod } from '../components/FiltersModal'

const idMovieRecord = localStorage.getItem(LocalStorage.idMovieInitDataRecord)

export const idMovieInitDataRecord = atom<Record<string, MovieInitData>>({
  key: 'idMovieInitDataMap',
  default: idMovieRecord ? JSON.parse(idMovieRecord) : ({} as Record<string, MovieInitData>),
})

export const firstRenderSortedIds = selector<string[]>({
  key: 'firstRenderSortedIds',
  get: ({ get }) => {
    const currentSortMethod = get(sortMethod)
    const idMovieRecords = get(idMovieInitDataRecord)
    const idMovieRecordKeys = Object.keys(idMovieRecords)
    switch (currentSortMethod) {
      case Sort.alphabetically:
        return idMovieRecordKeys.sort((aMovieId, bMovieId) => {
          return idMovieRecords[aMovieId].name.localeCompare(idMovieRecords[bMovieId].name)
        })
      case Sort.byPremiere:
        return idMovieRecordKeys.sort((aMovieId, bMovieId) => {
          const [aTimeLeft, bTimeLeft] = [
            get(timeLeftToAir(aMovieId)),
            get(timeLeftToAir(bMovieId)),
          ]
          if (aTimeLeft !== null && bTimeLeft !== null) return aTimeLeft - bTimeLeft
          if (aTimeLeft !== null && bTimeLeft === null) return -1
          if (aTimeLeft === null && bTimeLeft !== null) return 1
          return 0
        })
      case Sort.byAddTime:
      default:
        // by add time
        return idMovieRecordKeys.sort((aMovieId, bMovieId) => {
          const [aAddTime, bAddTime] = [
            idMovieRecords[aMovieId].addTime,
            idMovieRecords[bMovieId].addTime,
          ]
          return aAddTime - bAddTime
        })
    }
  },
})
