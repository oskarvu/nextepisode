import React from 'react'
import 'tailwindcss/dist/base.min.css'

import { RecoilRoot } from 'recoil'
import TopBar from './views/TopBar'
import MovieCollection from './views/MovieCollection'
import Footer from './views/Footer'
import tw from 'twin.macro'

const MainContainer = tw.div`
  flex flex-col
  min-h-screen
  bg-gray-300
`

function App() {
  return (
    <RecoilRoot>
      <MainContainer>
        <TopBar />
        <MovieCollection />
        <Footer />
      </MainContainer>
    </RecoilRoot>
  )
}

export default App
