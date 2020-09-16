import React, { useContext } from 'react'
import { SearchResult } from '../../api/types'
import tw from 'twin.macro'
import Check from '../../assets/icons/Check'
import { MoviesIdsContext, MoviesIdsContextShape } from '../Main'
import { useSetRecoilState } from 'recoil'
import { selectedMovieIdStateFamily } from '../MoviesList'

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
  const { moviesIds, setMoviesIds } = useContext<MoviesIdsContextShape>(
    MoviesIdsContext
  )
  const setMovieAsSelected = useSetRecoilState(
    selectedMovieIdStateFamily(result.id)
  )

  function handleOnClick(result: SearchResult) {
    setModalVisible(false)
    setSearchBarInputText('')
    !moviesIds.find((mId) => mId === result.id)
      ? setMoviesIds([result.id, ...moviesIds])
      : setMovieAsSelected(true)
  }

  return (
    <Result>
      <ResultButton onClick={() => handleOnClick(result)}>
        <ResultText>{result.name}</ResultText>
        <PillsContainer>
          {moviesIds.find((id) => result.id === id) && (
            <InfoPill>
              <ResultCheck />
            </InfoPill>
          )}
          {result.firstAirDate && (
            <InfoPill>{result.firstAirDate.substr(0, 4)}</InfoPill>
          )}
        </PillsContainer>
      </ResultButton>
    </Result>
  )
}
