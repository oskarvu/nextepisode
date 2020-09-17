import React from 'react'
import 'tailwindcss/dist/base.min.css'

import Main from './components/Main'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  )
}

export default App
