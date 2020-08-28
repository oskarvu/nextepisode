import React from "react";
import tw from "twin.macro";

import { Episode, Status } from "../api/types";

import Check from "../assets/icons/Check";

const Container = tw.div`
  flex flex-row sm:flex-col items-center justify-center
`;

const Counter = tw.div`
  flex justify-center items-center
  w-20 h-20 sm:w-28 sm:h-28
  pb-1
  bg-gray-800 bg-opacity-80 shadow-md rounded-full
  text-gray-200 font-normal text-4xl sm:text-6xl
`;

// absolute bottom-0 flex justify-center items-center
const FollowUp = tw.div`
  px-2 ml-2 sm:ml-0 sm:mt-2
  bg-gray-400 bg-opacity-75 rounded-full shadow-md
  text-gray-800 font-bold text-sm tracking-wider uppercase
`;

const CheckIcon = tw(Check)`
  w-10 h-10 sm:w-14 sm:h-14
`;

function calculateDaysLeft(airDateString: string) {
  const airDate = Date.parse(airDateString);
  const timeDifference = airDate - Date.now();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

interface Props {
  nextEpisode: Episode | null;
  status: string;
}

// todo: make this render less idiotic
function Countdown({ nextEpisode, status }: Props) {
  if (nextEpisode?.airDate) {
    const daysLeft = calculateDaysLeft(nextEpisode.airDate);
    const monthsLeft = Math.ceil(daysLeft / 30);
    const countdownPair =
      daysLeft > 30
        ? { time: monthsLeft, unit: "months" }
        : { time: daysLeft, unit: "days" };
    return (
      <Container>
        <Counter>{countdownPair.time}</Counter>
        <FollowUp>{countdownPair.unit} left</FollowUp>
      </Container>
    );
  }

  if (status.toLowerCase() === Status.Ended) {
    return (
      <Container>
        <Counter>
          <CheckIcon />
        </Counter>
        <FollowUp>series completed</FollowUp>
      </Container>
    );
  }
  return (
    <Container>
      <Counter>?</Counter>
      <FollowUp>no info yet</FollowUp>
    </Container>
  );
}

export default Countdown;
