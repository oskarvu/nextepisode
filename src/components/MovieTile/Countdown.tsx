import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'

import { Episode, Status } from '../../api/types'
import { StatusText, CounterFollowText, FetchErrors } from '../../translations/en-US'
import { calculateDaysLeft, calculateMonthsLeft } from '../../utils/time'

import { useSetRecoilState } from 'recoil'
import { timeLeftToAir } from './movieSharedState'

import { Check } from '../../assets/icons/Check'
import { X } from '../../assets/icons/motionable/X'
import { Pencil } from '../../assets/icons/Pencil'
import { Reply } from '../../assets/icons/Reply'
import { Heart } from '../../assets/icons/Heart'
import { LocalStorage } from '../../db/types'
import { IdTimeLeftHistoric } from '../../views/movieCollectionState'
import { Exclamation } from '../../assets/icons/Exclamation'

const Container = tw.div`
  flex flex-row sm:flex-col items-center justify-center
`

const Counter = tw.div`
  flex justify-center items-center
  w-14 h-14 sm:w-28 sm:h-28
  bg-gray-800 bg-opacity-85 shadow-md rounded-full
  text-gray-200 font-normal text-4xl sm:text-6xl
`

const FollowUp = tw.div`
  px-2 ml-2 sm:ml-0 sm:mt-2
  bg-gray-300 bg-opacity-80 rounded-full shadow-md
  text-gray-800 font-bold text-sm tracking-wider uppercase
`

const IconBase = `
  w-10 h-10 sm:w-14 sm:h-14
`

const CheckIcon = tw(Check)`${IconBase}`

const XIcon = tw(X)`${IconBase}`

const PencilIcon = tw(Pencil)`${IconBase}`

const ReplyIcon = tw(Reply)`${IconBase}`

const HeartIcon = tw(Heart)`${IconBase}`

const ErrorIcon = tw(Exclamation)`${IconBase}`

interface Props {
  movieId: string
  nextEpisode: Episode | null
  status: string
  isError: boolean
}

interface CountdownData {
  counter: JSX.Element | string | number
  follow: string
}

export default function Countdown({ nextEpisode, status, movieId, isError }: Props) {
  const [daysLeft] = useState(() => initDaysState())
  const [countdownData] = useState<CountdownData>(() => initCountdownData(daysLeft))
  const setTimeLeftToAir = useSetRecoilState(timeLeftToAir(movieId))

  useEffect(() => {
    setTimeLeftToAir(daysLeft)
  }, [daysLeft, setTimeLeftToAir])

  useEffect(() => {
    IdTimeLeftHistoric.set(movieId, daysLeft)
    localStorage.setItem(
      LocalStorage.idTimeLeftMap,
      JSON.stringify(Array.from(IdTimeLeftHistoric.entries()))
    )
  }, [movieId, daysLeft])

  return isError ? (
    <Container>
      <Counter>
        <ErrorIcon iconLabel="error" />
      </Counter>
      <FollowUp>{FetchErrors.movieDetailsFetchError}</FollowUp>
    </Container>
  ) : (
    <Container>
      <Counter>{countdownData.counter}</Counter>
      <FollowUp>{countdownData.follow}</FollowUp>
    </Container>
  )

  function initDaysState(): number | null {
    return nextEpisode?.airDate ? calculateDaysLeft(nextEpisode.airDate) : null
  }

  function initCountdownData(daysLeft: number | null): CountdownData {
    if (daysLeft !== null) {
      if (daysLeft === 0) {
        return {
          counter: <HeartIcon iconLabel="heart" />,
          follow: CounterFollowText.today,
        }
      }
      if (daysLeft <= 60) {
        return {
          counter: daysLeft,
          follow: daysLeft === 1 ? CounterFollowText.dayLeft : CounterFollowText.daysLeft,
        }
      }
      const monthsLeft = calculateMonthsLeft(daysLeft)
      return {
        counter: monthsLeft,
        follow: monthsLeft === 1 ? CounterFollowText.monthLeft : CounterFollowText.monthsLeft,
      }
    }

    switch (status) {
      case Status.Ended:
        return { counter: <CheckIcon iconLabel="checkmark" />, follow: StatusText.Ended }
      case Status.Canceled:
        return { counter: <XIcon iconLabel="X" />, follow: StatusText.Canceled }
      case Status.ReturningSeries:
        return { counter: <ReplyIcon iconLabel="returning" />, follow: StatusText.ReturningSeries }
      case Status.Planed:
        return { counter: <PencilIcon iconLabel="pencil" />, follow: StatusText.Planed }
      default:
        return { counter: '?', follow: CounterFollowText.noInfo }
    }
  }
}
