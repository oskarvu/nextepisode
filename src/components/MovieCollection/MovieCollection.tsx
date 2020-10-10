import React, { useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'

import { sortedMovieIds, idMovieInitDataRecord } from './sharedState'
import { WelcomeScreenTexts } from '../../translations/en-US'

import { MovieListItem } from '../MovieTile/MovieListItem'
import { LocalDBKeys } from '../../db/types'
import { FiltersModal } from '../FiltersModal/FiltersModal'
import { ReactComponent as SearchImage } from '../../assets/images/welcome-screen/search.svg'
import { ReactComponent as CollectImage } from '../../assets/images/welcome-screen/collect.svg'
import { ReactComponent as WatchImage } from '../../assets/images/welcome-screen/watch.svg'
import blobsMd from '../../assets/images/welcome-screen/blobsMd.svg'
import oneBg from '../../assets/images/welcome-screen/oneBg.svg'
import twoBg from '../../assets/images/welcome-screen/twoBg.svg'
import threeBg from '../../assets/images/welcome-screen/threeBg.svg'

const MoviesList = tw(motion.ul)`
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

const TextTileLi = styled(motion.li)(({ bgImage }: { bgImage?: string }) => [
  tw`flex relative items-center
  w-1/2 pl-0 odd:pl-3 pr-3 odd:pr-0
  text-center text-sm sm:text-2xl font-bold text-gray-700 leading-tight
  bg-center bg-no-repeat`,
  `background-image: url(${bgImage}); background-size: 40% 40%;`,
])

const ImageTileLi = tw(motion.li)`
  flex relative
  w-1/2
  px-4 my-2
`

const listVariant = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const listItemVariant = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -10 },
}

export function MovieCollection() {
  const idMovieRecord = useRecoilValue(idMovieInitDataRecord)
  const firstRenderIds = useRecoilValue(sortedMovieIds)

  useEffect(() => {
    localStorage.setItem(LocalDBKeys.idMovieInitDataRecord, JSON.stringify(idMovieRecord))
  }, [idMovieRecord])

  return firstRenderIds.length ? (
    <MoviesList
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
    </MoviesList>
  ) : (
    <WelcomeScreenList initial="hidden" animate="visible" variants={listVariant}>
      <TextTileLi key={1} variants={listItemVariant} bgImage={oneBg}>
        {WelcomeScreenTexts.findYourFavShow}
      </TextTileLi>
      <ImageTileLi key={2} variants={listItemVariant}>
        <SearchImage />
      </ImageTileLi>
      <ImageTileLi key={3} variants={listItemVariant}>
        <CollectImage />
      </ImageTileLi>
      <TextTileLi key={4} variants={listItemVariant} bgImage={twoBg}>
        {WelcomeScreenTexts.addToCollection}
      </TextTileLi>
      <TextTileLi key={5} variants={listItemVariant} bgImage={threeBg}>
        {WelcomeScreenTexts.nowYouKnow}
      </TextTileLi>
      <ImageTileLi key={6} variants={listItemVariant}>
        <WatchImage />
      </ImageTileLi>
    </WelcomeScreenList>
  )
}
