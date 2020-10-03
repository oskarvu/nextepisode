import React, { useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'

import { MovieListItem } from '../components/MovieTile/MovieListItem'
import { useRecoilValue } from 'recoil'
import { LocalStorage } from '../db/types'
import { FiltersModal } from '../components/FiltersModal/FiltersModal'
import { firstRenderSortedIds, idMovieInitDataRecord } from './movieCollectionState'
import { ReactComponent as SearchImage } from '../assets/images/welcome-screen/search.svg'
import { ReactComponent as CollectImage } from '../assets/images/welcome-screen/collect.svg'
import { ReactComponent as WatchImage } from '../assets/images/welcome-screen/watch.svg'
import blobsMd from '../assets/images/welcome-screen/blobsMd.svg'
import oneBg from '../assets/images/welcome-screen/oneBg.svg'
import twoBg from '../assets/images/welcome-screen/twoBg.svg'
import threeBg from '../assets/images/welcome-screen/threeBg.svg'

const List = tw(motion.ul)`
  relative flex flex-wrap flex-grow content-start
  w-full md:w-10/12 lg:w-8/12 xl:w-10/12 xxl:w-8/12 xxxxl:w-7/12
  m-auto my-2 px-4
`

const WelcomeScreenList = styled(motion.ul)(() => [
  tw`
  relative flex flex-wrap
  w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 xxl:w-4/12 xxxl:w-3/12 xxxxl:w-2/12
  my-6 sm:my-10 lg:my-12
  bg-contain bg-center bg-no-repeat`,
  `background-image: url(${blobsMd})`,
])

const TextTile = styled(motion.li)(({ bgImage }: { bgImage?: string }) => [
  tw`flex relative items-center text-center pl-0 odd:pl-3 pr-3 odd:pr-0
  w-1/2 text-sm sm:text-2xl font-bold text-gray-700 leading-tight bg-center bg-no-repeat`,
  `background-image: url(${bgImage}); background-size: 40% 40%;`,
])

const ImageTile = tw(motion.li)`
  flex relative w-1/2 px-4 my-2
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
  hidden: { opacity: 0, y: -10 },
}

export default function MovieCollection() {
  const idMovieRecord = useRecoilValue(idMovieInitDataRecord)
  const firstRenderIds = useRecoilValue(firstRenderSortedIds)

  useEffect(() => {
    localStorage.setItem(LocalStorage.idMovieInitDataRecord, JSON.stringify(idMovieRecord))
  }, [idMovieRecord])

  return firstRenderIds.length ? (
    <List
      key="test"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <AnimateSharedLayout>
        <AnimatePresence>
          {firstRenderIds.map((id) => (
            <MovieListItem key={id} movieId={id} />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
      <FiltersModal />
    </List>
  ) : (
    <WelcomeScreenList initial="hidden" animate="visible" variants={animateList}>
      <TextTile key={1} variants={animateItem} bgImage={oneBg}>
        Use search bar to find your favourite tv show
      </TextTile>
      <ImageTile key={2} variants={animateItem}>
        <SearchImage />
      </ImageTile>
      <ImageTile key={3} variants={animateItem}>
        <CollectImage />
      </ImageTile>
      <TextTile key={4} variants={animateItem} bgImage={twoBg}>
        Click on result to add it to your collection
      </TextTile>
      <TextTile key={5} variants={animateItem} bgImage={threeBg}>
        Now you know when the next episode will be aired
      </TextTile>
      <ImageTile key={6} variants={animateItem}>
        <WatchImage />
      </ImageTile>
    </WelcomeScreenList>
  )
}
