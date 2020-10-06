import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'

import { Episode, Status } from '../../api/types'
import { StatusTexts, CounterFollowTexts, FetchErrors } from '../../translations/en-US'
import { calculateDaysLeft, calculateMonthsLeft } from '../../utils/time'

import { useSetRecoilState } from 'recoil'
import { timeLeftToAir } from './sharedState'
import { IdTimeLeftHistoric } from '../MovieCollection/sharedState'
import { LocalDBKeys } from '../../db/types'

import { Check } from '../../assets/icons/Check'
import { X } from '../../assets/icons/motionable/X'
import { Pencil } from '../../assets/icons/Pencil'
import { Reply } from '../../assets/icons/Reply'
import { Heart } from '../../assets/icons/Heart'
import { Exclamation } from '../../assets/icons/Exclamation'

const Container = tw.div`
  flex flex-row sm:flex-col items-center justify-center
`

const Counter = tw.div`
  flex justify-center items-center
  w-14 h-14 sm:w-28 sm:h-28
  text-gray-200 font-normal text-4xl sm:text-6xl
  bg-gray-800 bg-opacity-85 shadow-md rounded-full
`

const FollowUp = tw.div`
  px-2 ml-2 sm:ml-0 sm:mt-2
  text-gray-800 font-bold text-sm tracking-wider uppercase
  bg-gray-300 bg-opacity-80 rounded-full shadow-md
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

interface CountdownData {
  counter: JSX.Element | string | number
  follow: string
}

interface Props {
  movieId: string
  nextEpisode: Episode | null
  status: string
  isError: boolean
}

export function Countdown({ nextEpisode, status, movieId, isError }: Props) {
  const [daysLeft] = useState(() => initDaysState())
  const [countdownData] = useState<CountdownData>(() => initCountdownData(daysLeft))
  const setTimeLeftToAir = useSetRecoilState(timeLeftToAir(movieId))

  useEffect(() => {
    setTimeLeftToAir(daysLeft)
  }, [daysLeft, setTimeLeftToAir])

  useEffect(() => {
    IdTimeLeftHistoric.set(movieId, daysLeft)
    localStorage.setItem(
      LocalDBKeys.idTimeLeftMap,
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
          follow: CounterFollowTexts.today,
        }
      }
      if (daysLeft <= 60) {
        return {
          counter: daysLeft,
          follow: daysLeft === 1 ? CounterFollowTexts.dayLeft : CounterFollowTexts.daysLeft,
        }
      }
      const monthsLeft = calculateMonthsLeft(daysLeft)
      return {
        counter: monthsLeft,
        follow: monthsLeft === 1 ? CounterFollowTexts.monthLeft : CounterFollowTexts.monthsLeft,
      }
    }

    switch (status) {
      case Status.Ended:
        return { counter: <CheckIcon iconLabel="checkmark" />, follow: StatusTexts.Ended }
      case Status.Canceled:
        return { counter: <XIcon iconLabel="X" />, follow: StatusTexts.Canceled }
      case Status.ReturningSeries:
        return { counter: <ReplyIcon iconLabel="returning" />, follow: StatusTexts.ReturningSeries }
      case Status.Planed:
        return { counter: <PencilIcon iconLabel="pencil" />, follow: StatusTexts.Planed }
      default:
        return { counter: '?', follow: CounterFollowTexts.noInfo }
    }
  }
}
