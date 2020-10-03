import React, { useEffect } from 'react'
import 'tailwindcss/dist/base.min.css'

import { RecoilRoot } from 'recoil'
import TopBar from './views/TopBar'
import MovieCollection from './views/MovieCollection'
import Footer from './views/Footer'
import { MainContainer } from './views/MainContainer'

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
