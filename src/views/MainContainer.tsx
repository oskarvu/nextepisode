import React from 'react'
import { useSetRecoilState } from 'recoil'
import { isFilterModalExpanded } from '../components/FiltersModal/FiltersModal'
import { isResultsModalVisible } from '../components/SearchBar/resultsModalSharedState'
import { useEffect } from 'react'
import tw from 'twin.macro'

const Container = tw.div`
  flex flex-col justify-between items-center
  min-h-screen
  bg-gray-300
`

export const MainContainer: React.FC = ({ children }) => {
  const setIsFiltersModalExpanded = useSetRecoilState(isFilterModalExpanded)
  const setIsResultsModalVisible = useSetRecoilState(isResultsModalVisible)

  useEffect(() => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        setIsFiltersModalExpanded(false)
        setIsResultsModalVisible(false)
      }
    })
  }, [setIsResultsModalVisible, setIsFiltersModalExpanded])

  return <Container>{children}</Container>
}
