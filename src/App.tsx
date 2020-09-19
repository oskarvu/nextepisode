import React from 'react'
import 'tailwindcss/dist/base.min.css'

import Main from './components/Main'
import { RecoilRoot } from 'recoil'
import { ReactQueryDevtools } from 'react-query-devtools'

function App() {
  return (
    <RecoilRoot>
      <Main />
      <ReactQueryDevtools initialIsOpen />
    </RecoilRoot>
  )
}

export default App
