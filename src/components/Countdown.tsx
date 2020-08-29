import React, { useState } from "react";
import tw from "twin.macro";

import { CounterFollow, Episode, Status } from "../api/types";
import { calculateDaysLeft, calculateMonthsLeft } from "../utils/utils";

import Check from "../assets/icons/Check";
import X from "../assets/icons/X";

const Container = tw.div`
  flex flex-row sm:flex-col items-center justify-center
`;

const Counter = tw.div`
  flex justify-center items-center
  w-20 h-20 sm:w-28 sm:h-28
  pb-1
  bg-gray-800 bg-opacity-85 shadow-md rounded-full
  text-gray-200 font-normal text-4xl sm:text-6xl
`;

const FollowUp = tw.div`
  px-2 ml-2 sm:ml-0 sm:mt-2
  bg-gray-300 bg-opacity-80 rounded-full shadow-md
  text-gray-800 font-bold text-sm tracking-wider uppercase
`;

const CheckIcon = tw(Check)`
  w-10 h-10 sm:w-14 sm:h-14
`;

const XIcon = tw(X)`
  w-10 h-10 sm:w-14 sm:h-14
`;

interface Props {
  nextEpisode: Episode | null;
  status: string;
}

interface CountdownData {
  counter: JSX.Element | string | number;
  follow: string;
}

// todo: make this render less idiotic
function Countdown({ nextEpisode, status }: Props) {
  function initDaysState(): number | null {
    if (nextEpisode?.airDate) {
      return calculateDaysLeft(nextEpisode.airDate);
    }
    return null;
  }

  function initCountdownData(daysLeft: number | null): CountdownData {
    if (daysLeft) {
      if (daysLeft <= 60) {
        return {
          counter: daysLeft,
          follow:
            daysLeft === 1 ? CounterFollow.dayLeft : CounterFollow.daysLeft,
        };
      }
      const monthsLeft = calculateMonthsLeft(daysLeft);
      return {
        counter: monthsLeft,
        follow:
          monthsLeft === 1 ? CounterFollow.monthLeft : CounterFollow.monthsLeft,
      };
    }
    if (nextEpisode) {
      return { counter: "?", follow: "no info yet" };
    }
    if (status.toLowerCase() === Status.Ended) {
      return { counter: <CheckIcon />, follow: Status.Ended };
    }
    // status.toLowerCase() === Status.Cancelled
    return { counter: <XIcon />, follow: Status.Cancelled };
  }

  const [daysLeft] = useState(initDaysState());
  const [countdownData] = useState<CountdownData>(initCountdownData(daysLeft));

  return (
    <Container>
      <Counter>{countdownData.counter}</Counter>
      <FollowUp>{countdownData.follow}</FollowUp>
    </Container>
  );
}

export default Countdown;
