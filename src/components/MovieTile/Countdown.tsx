import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'

import { Episode } from '../../api/types'
import { Status, CounterFollow } from '../../translations/en-US'
import { calculateDaysLeft, calculateMonthsLeft } from '../../utils/time'

import { useSetRecoilState } from 'recoil'
import { timeLeftToAir } from './movieSharedState'

import Check from '../../assets/icons/Check'
import X from '../../assets/icons/motionable/X'
import Pencil from '../../assets/icons/Pencil'
import Reply from '../../assets/icons/Reply'
import Heart from '../../assets/icons/Heart'

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

interface Props {
  movieId: string
  nextEpisode: Episode | null
  status: string
}

interface CountdownData {
  counter: JSX.Element | string | number
  follow: string
}

export default function Countdown({ nextEpisode, status, movieId }: Props) {
  const [daysLeft] = useState(() => initDaysState())
  const [countdownData] = useState<CountdownData>(() => initCountdownData(daysLeft))
  const setTimeLeftToAir = useSetRecoilState(timeLeftToAir(movieId))

  useEffect(() => {
    setTimeLeftToAir(daysLeft)
  }, [daysLeft, setTimeLeftToAir])

  return (
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
          counter: <HeartIcon />,
          follow: CounterFollow.today,
        }
      }
      if (daysLeft <= 60) {
        return {
          counter: daysLeft,
          follow: daysLeft === 1 ? CounterFollow.dayLeft : CounterFollow.daysLeft,
        }
      }
      const monthsLeft = calculateMonthsLeft(daysLeft)
      return {
        counter: monthsLeft,
        follow: monthsLeft === 1 ? CounterFollow.monthLeft : CounterFollow.monthsLeft,
      }
    }

    switch (status.toLowerCase()) {
      case Status.Ended:
        return { counter: <CheckIcon />, follow: Status.Ended }
      case Status.Canceled:
        return { counter: <XIcon />, follow: Status.Canceled }
      case Status.ReturningSeries:
        return { counter: <ReplyIcon />, follow: Status.ReturningSeries }
      case Status.Planed:
        return { counter: <PencilIcon />, follow: Status.Planed }
      default:
        return { counter: '?', follow: CounterFollow.noInfo }
    }
  }
}
