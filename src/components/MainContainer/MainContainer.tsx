import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { useSetRecoilState } from 'recoil'

import { isFilterModalExpanded } from '../FiltersModal/sharedState'
import { isResultsModalVisible } from '../TopBar/sharedState'

const Container = tw.div`
  flex flex-col justify-between items-center
  min-h-screen
  bg-gray-300
`

export function MainContainer({ children }: { children: React.ReactNode }) {
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
