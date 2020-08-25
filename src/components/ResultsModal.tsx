import React, { useContext, useState } from "react";
import tw from "twin.macro";

import { MoviesContext, MoviesContextShape } from "./Main";

import { getApiURL, fetchFromTMDB, parseToMovie } from "../utils/api";
import apiConfig from "../api/config";
import { SearchResult } from "../api/interfaces";

import PlusCircle from "../assets/icons/PlusCircle";
import CheckCircle from "../assets/icons/CheckCircle";
import XCircle from "../assets/icons/XCircle";

const Modal = tw.div`
  absolute w-4/6
  bg-white
  rounded-b-4xl
  z-10
`;

const Result = tw.li`
  mx-6 my-2 first:mt-3 last:mb-5
`;

const ResultButton = tw.button`
  w-full p-3 pl-16
  rounded-full focus:outline-none
  text-gray-600 text-xl font-medium text-left
  hover:bg-gray-100 hover:text-gray-800
`;

const SpannedYear = tw.span`
  float-right
  py-1 px-2 mr-1 rounded-full
  text-sm
  bg-gray-300
`;

const CircleIconBase = `
  absolute cursor-pointer
  w-12 h-12 ml-1 mt-1
  text-gray-400
  hover:text-gray-600
`;

const PlusCircleIcon = tw(PlusCircle)`${CircleIconBase}`;

const XCircleIcon = tw(XCircle)`${CircleIconBase}`;

const CheckCircleIcon = tw(CheckCircle)`${CircleIconBase}`;

interface CircleIconProps {
  movieId: number;
}

function CircleIcon({ movieId }: CircleIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext);

  const movieOnList = movies.find((m) => m.id === movieId);
  if (movieOnList) {
    if (isHovered) {
      return (
        <XCircleIcon
          onClick={() => {
            setMovies(movies.filter((m) => m.id !== movieId));
          }}
          onMouseLeave={() => setIsHovered(false)}
        />
      );
    } else {
      return <CheckCircleIcon onMouseEnter={() => setIsHovered(true)} />;
    }
  } else {
    return (
      <PlusCircleIcon
        onClick={() => {
          const queryText = getApiURL(movieId, apiConfig.queryType.TV);
          fetchFromTMDB(queryText).then((movie) => {
            !movies.find((m) => m.id === movie.id) &&
              setMovies([...movies, parseToMovie(movie)]);
          });
          setIsHovered(true);
        }}
      />
    );
  }
}

interface ResultsModalProps {
  results: SearchResult[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchBarInputText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ResultsModal({
  results,
  visible,
  setVisible,
  setSearchBarInputText,
}: ResultsModalProps) {
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext);

  // todo: implement sorting with the smallest time to air
  return visible ? (
    <Modal>
      <ul>
        {results.slice(0, 10).map((result) => (
          <Result key={result.id}>
            <CircleIcon movieId={result.id} />
            <ResultButton
              onClick={() => {
                setVisible(false);
                setSearchBarInputText("");
                const queryText = getApiURL(result.id, apiConfig.queryType.TV);
                fetchFromTMDB(queryText).then((movie) => {
                  !movies.find((m) => m.id === movie.id) &&
                    setMovies([...movies, movie]);
                });
              }}
            >
              {result.name}
              {result.firstAirDate && (
                <SpannedYear>{result.firstAirDate.substr(0, 4)}</SpannedYear>
              )}
            </ResultButton>
          </Result>
        ))}
      </ul>
    </Modal>
  ) : null;
}
