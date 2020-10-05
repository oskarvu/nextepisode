import React from 'react'
import 'tailwindcss/dist/base.min.css'
import { RecoilRoot } from 'recoil'

import { TopBar } from './components/TopBar/TopBar'
import { MovieCollection } from './components/MovieCollection/MovieCollection'
import { Footer } from './components/Footer/Footer'
import { MainContainer } from './components/MainContainer'

export default function App() {
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
