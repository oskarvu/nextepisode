import React from "react";
import tw from "twin.macro";

import { Episode } from "../api/interfaces";

import Check from "../assets/icons/Check";

const Counter = tw.div`
  flex justify-center items-center
  w-28 h-28 rounded-full
  bg-gray-800 bg-opacity-80 shadow-md
  text-gray-200 font-normal text-6xl pb-2
`;

const Unit = tw.div`
  absolute bottom-0 flex justify-center items-center
  px-2 mb-8
  bg-gray-400 bg-opacity-75 rounded-full shadow-md
  text-gray-800 font-bold text-sm tracking-wider uppercase
`;

const CheckIcon = tw(Check)`
  w-14 h-14
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

function Countdown({ nextEpisode, status }: Props) {
  if (nextEpisode?.airDate) {
    const daysLeft = calculateDaysLeft(nextEpisode.airDate);
    const monthsLeft = Math.ceil(daysLeft / 30);
    const countdownPair =
      daysLeft > 30
        ? { time: monthsLeft, unit: "months" }
        : { time: daysLeft, unit: "days" };
    return (
      <>
        <Counter>{countdownPair.time}</Counter>
        <Unit>{countdownPair.unit} left</Unit>
      </>
    );
  }
  //todo: make status as enum
  if (status.toLowerCase() === "ended") {
    return (
      <>
        <Counter>
          <CheckIcon />
        </Counter>
        <Unit>series completed</Unit>
      </>
    );
  }
  return (
    <>
      <Counter>?</Counter>
      <Unit>no info yet</Unit>
    </>
  );
}

export default Countdown;
