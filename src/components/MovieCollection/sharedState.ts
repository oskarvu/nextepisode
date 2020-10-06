import { atom, selector } from 'recoil'
import { MovieInitData, movieStatus, timeLeftToAir } from '../MovieTile/sharedState'
import { LocalDBKeys } from '../../db/types'
import { statusOrder } from '../../api/utils'
import { SortByMethod } from '../FiltersModal/sharedState'
import { SortMethod } from '../FiltersModal/types'

const storedIdLeftTime = localStorage.getItem(LocalDBKeys.idTimeLeftMap)
const idTimeLeftHistoric: Map<string, number> = storedIdLeftTime
  ? new Map<string, number>(JSON.parse(storedIdLeftTime))
  : new Map<string, number>()

const idMovieRecord = localStorage.getItem(LocalDBKeys.idMovieInitDataRecord)
export const idMovieInitDataRecord = atom<Record<string, MovieInitData>>({
  key: 'idMovieInitDataMap',
  default: idMovieRecord ? JSON.parse(idMovieRecord) : {},
})

export const IdTimeLeftHistoric = new Map<string, number | null>()

export const firstRenderSortedIds = selector<string[]>({
  key: 'firstRenderSortedIds',
  get: ({ get }) => {
    const currentSortMethod = get(SortByMethod)
    const idMovieRecords = get(idMovieInitDataRecord)
    const idMovieRecordKeys = Object.keys(idMovieRecords)

    switch (currentSortMethod) {
      case SortMethod.alphabetically:
        return idMovieRecordKeys.sort(byNameAZ)
      case SortMethod.byPremiere:
        return idMovieRecordKeys.sort((aMovieId, bMovieId) => {
          const [aTimeLeft, bTimeLeft] = [
            get(timeLeftToAir(aMovieId)) ?? idTimeLeftHistoric.get(aMovieId) ?? null,
            get(timeLeftToAir(bMovieId)) ?? idTimeLeftHistoric.get(bMovieId) ?? null,
          ]
          if (aTimeLeft !== null && bTimeLeft !== null) return aTimeLeft - bTimeLeft
          if (aTimeLeft !== null && bTimeLeft === null) return -1
          if (aTimeLeft === null && bTimeLeft !== null) return 1
          return byStatusPriority(aMovieId, bMovieId)
        })
      case SortMethod.byAddTime:
      default:
        return idMovieRecordKeys.sort(byNewlyAddedFirst)
    }

    function byNameAZ(aMovieId: string, bMovieId: string) {
      return idMovieRecords[aMovieId].name.localeCompare(idMovieRecords[bMovieId].name)
    }

    function byNewlyAddedFirst(aMovieId: string, bMovieId: string) {
      return idMovieRecords[bMovieId].addTime - idMovieRecords[aMovieId].addTime
    }

    function byStatusPriority(aMovieId: string, bMovieId: string) {
      const [aStatusPriority, bStatusPriority] = [
        statusOrder(get(movieStatus(aMovieId))),
        statusOrder(get(movieStatus(bMovieId))),
      ]
      if (aStatusPriority === bStatusPriority) {
        return idMovieRecords[aMovieId].name.localeCompare(idMovieRecords[bMovieId].name)
      }
      return aStatusPriority - bStatusPriority
    }
  },
})
