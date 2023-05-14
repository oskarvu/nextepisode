import { inject } from '@vercel/analytics'
import React from 'react'
import { RecoilRoot } from 'recoil'
import 'tailwindcss/dist/base.min.css'

import { Footer } from './components/Footer/Footer'
import { MainContainer } from './components/MainContainer/MainContainer'
import { MovieCollection } from './components/MovieCollection/MovieCollection'
import { TopBar } from './components/TopBar/TopBar'

inject()

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
