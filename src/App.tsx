import React from 'react'
import 'tailwindcss/dist/base.min.css'

import { RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from 'react-query-devtools'
import TopBar from './views/TopBar'
import MovieCollection from './views/MovieCollection'
import Footer from './views/Footer'
import tw from 'twin.macro'

const MainContainer = tw.div`
  min-h-screen
  bg-gray-200
`

// todo: add error handling (api)
function App() {
  return (
    <RecoilRoot>
      <MainContainer>
        <TopBar />
        <MovieCollection />
        <Footer />
      </MainContainer>
      <ReactQueryDevtools initialIsOpen />
    </RecoilRoot>
  )
}

export default App
