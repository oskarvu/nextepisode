import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MovieTile } from '../components/MovieTile/MovieTile'
import { useRecoilValue } from 'recoil'
import { LocalStorage } from '../db/types'
import { FiltersModal } from '../components/FiltersModal/FiltersModal'
import { firstRenderSortedIds, idMovieInitDataRecord } from './movieCollectionState'
import { ReactComponent as SearchImage } from '../assets/images/welcome-screen/search.svg'
import { ReactComponent as CollectImage } from '../assets/images/welcome-screen/collect.svg'
import { ReactComponent as WatchImage } from '../assets/images/welcome-screen/watch.svg'
import { ReactComponent as BlobMd } from '../assets/images/welcome-screen/blobs-md.svg'

const List = tw(motion.ul)`
  relative flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto mt-2 px-4
`

const StyledBlobMd = tw(BlobMd)`
  absolute h-full fill-current text-gray-200 w-full ml-auto mr-auto z-10
`

const FirstTimeContent = tw(motion.div)`
  relative flex flex-wrap
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto my-10 px-4 bg-contain bg-center bg-no-repeat
`

const TextTile = tw(motion.li)`
  flex relative  z-20 items-center odd:text-right px-4
  w-1/2 h-48 text-2xl font-bold text-gray-700 leading-tight
`

const ImageTile = tw(motion.li)`
  flex relative w-1/2 h-48 z-20
`

const animateList = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const animateItem = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
}

export default function MovieCollection() {
  const idMovieRecord = useRecoilValue(idMovieInitDataRecord)
  const firstRenderIds = useRecoilValue(firstRenderSortedIds)
  const [isCollectionEmpty, setIsCollectionEmpty] = useState(false)

  useEffect(() => {
    localStorage.setItem(LocalStorage.idMovieInitDataRecord, JSON.stringify(idMovieRecord))
  }, [idMovieRecord])

  return isCollectionEmpty ? (
    <List initial="hidden" animate="visible" variants={animateList}>
      <TextTile key={1} variants={animateItem}>
        Use search bar to find your favourite tv show
      </TextTile>
      <ImageTile key={2} variants={animateItem}>
        <SearchImage />
      </ImageTile>
      <ImageTile key={3} variants={animateItem}>
        <CollectImage />
      </ImageTile>
      <TextTile key={4} variants={animateItem}>
        Click on result and add to your collection
      </TextTile>
      <TextTile key={5} variants={animateItem}>
        Now you know how much time you need to wait for the next episode
      </TextTile>
      <ImageTile key={6} variants={animateItem}>
        <WatchImage />
      </ImageTile>
      {/*<StyledBlobMd />*/}
    </List>
  ) : (
    <List initial="hidden" animate="visible" variants={animateList}>
      <AnimateSharedLayout>
        <AnimatePresence>
          {firstRenderIds.map((id) => (
            <MovieTile key={id} movieId={id} />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
      <FiltersModal />
    </List>
  )
}
