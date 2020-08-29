import React from "react";
import tw from "twin.macro";
import Trash from "../assets/icons/Trash";
import { Movie } from "../api/types";

const Details = tw.div`
  relative inline-flex justify-between flex-col
  w-full sm:w-auto h-full p-3 pt-1
  bg-white shadow-lg
`;

const MovieName = tw.h1`
  w-92
  ml-1 my-1 mb-2
  text-2xl sm:text-3xl font-bold text-gray-700 leading-none
`;

const InfoBadge = tw.div`
  inline-block
  px-2 py-1 mr-1
  bg-gray-300 rounded-full
  text-xs uppercase font-bold text-gray-600 tracking-wider
`;

const Cell = tw.td`
  px-3 py-2
  border border-gray-300 border-4 
  uppercase text-sm font-bold text-gray-600 tracking-wider
`;

const TrashIcon = tw(Trash)`
  absolute right-0
  w-8 h-8 p-1
  cursor-pointer text-gray-500 hover:text-gray-700
`;

const Table = tw.table`
  hidden sm:block
`;

interface Props {
  movie: Movie;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

// todo: take into account series that are not yet aired
// todo: tidy up component data distribution
export default function MovieDetailsCard({ movie, movies, setMovies }: Props) {
  function handleTrashIconClick() {
    setMovies(movies.filter((m) => m.id !== movie.id));
  }

  return (
    <Details>
      <div>
        <MovieName>{movie.name}</MovieName>
        <InfoBadge>{movie.status}</InfoBadge>
        {movie.inProduction && <InfoBadge>in production</InfoBadge>}
      </div>
      <Table>
        <tbody>
          <tr>
            <Cell>last aired</Cell>
            <Cell>
              s{movie.lastEpisode?.season.toString().padStart(2, "0")}e
              {movie.lastEpisode?.episode.toString().padStart(2, "0")}
            </Cell>
            <Cell>{movie.lastEpisode?.airDate}</Cell>
          </tr>
        </tbody>
      </Table>
      <TrashIcon onClick={handleTrashIconClick} />
    </Details>
  );
}
