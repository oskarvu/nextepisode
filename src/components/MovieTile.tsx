import React, { useContext } from "react";
import tw, { styled } from "twin.macro";

import { MoviesContext, MoviesContextShape } from "./Main";
import { Movie } from "../api/types";

import Countdown from "./Countdown";
import MovieDetailsCard from "./MovieDetailsCard";

// todo: default backdrop if backdrop is null
const Tile = styled.div(({ backdrop }: { backdrop: string | null }) => [
  tw`
    flex justify-between
    w-full h-56 first:mt-5 mt-4
    rounded-4xl
    overflow-hidden
    bg-cover bg-center
  `,
  `box-shadow: inset 0 0 20px 0 rgba(0,0,0,0.5);`,
  backdrop
    ? `background-image: url("https://image.tmdb.org/t/p/w1280/${backdrop}");`
    : tw`bg-gray-600`,
]);

const LeftContainer = tw.div`
    w-1/2 h-full pb-8 pt-5 px-5 relative flex flex-col justify-center items-center
  `;

const RightContainer = tw.div`
  flex justify-end
  w-1/2 h-full
  py-5 pr-6
`;

//todo: dynamically change font size depending on number of words
//todo: check all statuses of series
function MovieTile({ movie }: { movie: Movie }) {
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext);

  return (
    <Tile backdrop={movie.backdrop}>
      <LeftContainer>
        <Countdown nextEpisode={movie.nextEpisode} status={movie.status} />
      </LeftContainer>
      <RightContainer>
        <MovieDetailsCard movie={movie} movies={movies} setMovies={setMovies} />
      </RightContainer>
    </Tile>
  );
}

export default MovieTile;
