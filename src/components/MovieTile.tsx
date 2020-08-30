import React, { useContext } from "react";
import tw, { styled } from "twin.macro";

import { MoviesContext, MoviesContextShape } from "./Main";
import { Movie } from "../api/types";

import Countdown from "./Countdown";
import MovieDetailsCard from "./MovieDetailsCard";

// todo: default backdrop if backdrop is null
const Tile = styled.div(({ backdrop }: { backdrop: string | null }) => [
  tw`
    flex flex-col sm:flex-row
    w-full h-auto sm:h-56 mt-2
    first:mt-4
    rounded-4xl overflow-hidden bg-cover bg-center
  `,
  `box-shadow: inset 0 0 10px 0 rgba(0,0,0,0.3);`,
  backdrop
    ? `background-image: url("https://image.tmdb.org/t/p/w1280/${backdrop}");`
    : tw`bg-gray-600`,
]);

const StartContainer = tw.div`
    flex justify-center
    w-full sm:w-5/12 lg:w-1/2 xl:w-7/12 sm:h-full
    px-4 pt-4 pb-3 sm:p-5
  `;

const EndContainer = tw.div`
  flex justify-end
  w-full sm:w-7/12 lg:w-1/2 xl:w-5/12 sm:h-full
  p-4 pt-0 sm:p-5
`;

//todo: dynamically change font size depending on number of words
//todo: check all statuses of series
function MovieTile({ movie }: { movie: Movie }) {
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext);

  return (
    <Tile backdrop={movie.backdrop}>
      <StartContainer>
        <Countdown nextEpisode={movie.nextEpisode} status={movie.status} />
      </StartContainer>
      <EndContainer>
        <MovieDetailsCard movie={movie} movies={movies} setMovies={setMovies} />
      </EndContainer>
    </Tile>
  );
}

export default MovieTile;
