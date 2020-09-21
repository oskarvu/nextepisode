import React from 'react'
import { SearchResult } from '../../api/types'
import tw from 'twin.macro'
import Check from '../../assets/icons/Check'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isMovieListed, movieFocusOn, movieInitState } from '../MovieTile/movieSharedState'
import { movieIds, toStoreMovieInitState } from '../../views/movieCollectionState'

const Result = tw.li`
  flex flex-row items-center
  mx-3 last:mb-1
`

const ResultButton = tw.button`
  flex flex-row justify-between items-center
  w-full py-3 pr-2 pl-4 ml-1
  rounded-full border-white border-2
  focus:outline-none focus:bg-white focus:border-gray-300
  text-gray-700 text-base sm:text-xl font-medium text-left
  hover:bg-gray-100 hover:text-gray-800
`

const ResultText = tw.div`
  pr-2 pb-1
`

const ResultCheck = tw(Check)`
  w-4 h-6
`

const PillsContainer = tw.div`
  flex
`

const InfoPill = tw.div`
  py-1 px-2 mr-1 rounded-full
  text-sm
  bg-gray-300
`

interface SingleResultProps {
  result: SearchResult
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSearchBarInputText: React.Dispatch<React.SetStateAction<string>>
}

export default function SingleResult({
  result,
  setModalVisible,
  setSearchBarInputText,
}: SingleResultProps) {
  const ids = useRecoilValue(movieIds)

  const addIfNotListed = useRecoilCallback(({ snapshot, set }) => {
    return async (resultId: number) => {
      const isClickedListed = await snapshot.getPromise(isMovieListed(resultId))
      if (!isClickedListed) {
        set(movieIds, (prevState) => [resultId, ...prevState])
        set(isMovieListed(resultId), true)
        set(movieInitState(resultId), (prevState) => ({
          ...prevState,
          id: result.id,
          name: result.name,
          addTime: Date.now(),
        }))
        set(toStoreMovieInitState, (prevState) => ({
          ...prevState,
          [resultId]: { id: result.id, name: result.name, addTime: Date.now() },
        }))
      }
    }
  }, [])

  const setFocusOnIfListed = useRecoilCallback(({ snapshot, set }) => {
    return async (resultId: number) => {
      const isClickedListed = await snapshot.getPromise(isMovieListed(resultId))
      if (isClickedListed) {
        set(movieFocusOn(resultId), true)
      }
    }
  }, [])

  return (
    <Result>
      <ResultButton onClick={() => handleOnClick(result)}>
        <ResultText>{result.name}</ResultText>
        <PillsContainer>
          {ids.includes(result.id) && (
            <InfoPill>
              <ResultCheck />
            </InfoPill>
          )}
          {result.firstAirDate && <InfoPill>{result.firstAirDate.substr(0, 4)}</InfoPill>}
        </PillsContainer>
      </ResultButton>
    </Result>
  )

  function handleOnClick(result: SearchResult) {
    setModalVisible(false)
    setSearchBarInputText('')
    addIfNotListed(result.id)
    setFocusOnIfListed(result.id)
  }
}
