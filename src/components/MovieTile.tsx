import React, { useContext } from "react";
import tw, { styled } from "twin.macro";

import Trash from "../assets/icons/Trash";
import Countdown from "./Countdown";
import { MoviesContext, MoviesContextShape } from "./Main";
import { Movie } from "../api/types";

// todo: default backdrop if backdrop is null
const Tile = styled.div(({ backdrop }: { backdrop: string | null }) => [
  tw`
    flex justify-between
    w-95 h-56 mt-6
    rounded-4xl
    overflow-hidden
    bg-cover bg-center
  `,
  `box-shadow: inset 0 0 20px 0 rgba(0,0,0,0.5);`,
  `background-image: url("https://image.tmdb.org/t/p/w1280/${backdrop}");`,
]);

const LeftContainer = tw.div`
    w-1/2 h-full pb-8 pt-5 px-5 relative flex flex-col justify-center items-center
  `;

const RightContainer = tw.div`
  flex justify-end
  w-1/2 h-full
  py-5 pr-6
`;

const Details = tw.div`
  relative inline-flex justify-between flex-col
  h-full p-3 pt-1
  bg-white shadow-lg
`;

const MovieName = tw.h1`
  ml-1 my-1
  text-3xl font-bold text-gray-700 leading-tight
`;

const AdditionalInfoBadge = tw.div`
  inline-block
  px-2 py-1 mr-1
  bg-gray-300 rounded-full
  text-xs uppercase font-bold text-gray-600 tracking-wider
`;

const Td = tw.td`
  px-3 py-2
  border border-gray-300 border-4 
  uppercase text-sm font-bold text-gray-600 tracking-wider
`;

const TrashIcon = tw(Trash)`
  absolute right-0
  w-8 h-8 p-1
  cursor-pointer text-gray-500 hover:text-gray-700
`;

//todo: dynamically change font size depending on number of words
//todo: check all statuses of series

interface Props {
  movie: Movie;
}

function MovieTile({ movie }: Props) {
  const { movies, setMovies } = useContext<MoviesContextShape>(MoviesContext);

  return (
    <Tile backdrop={movie.backdrop}>
      <LeftContainer>
        <Countdown nextEpisode={movie.nextEpisode} status={movie.status} />
      </LeftContainer>
      <RightContainer>
        <Details>
          <div>
            <MovieName>{movie.name}</MovieName>
            <AdditionalInfoBadge>{movie.status}</AdditionalInfoBadge>{" "}
            {movie.inProduction && (
              <AdditionalInfoBadge>in production</AdditionalInfoBadge>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <Td>last aired</Td>
                <Td>
                  s{movie.lastEpisode?.season.toString().padStart(2, "0")}e
                  {movie.lastEpisode?.episode.toString().padStart(2, "0")}
                </Td>
                <Td>{movie.lastEpisode?.airDate}</Td>
              </tr>
            </tbody>
          </table>
          <TrashIcon
            onClick={() => {
              setMovies(movies.filter((m) => m.id !== movie.id));
            }}
          />
        </Details>
      </RightContainer>
    </Tile>
  );
}

export default MovieTile;
