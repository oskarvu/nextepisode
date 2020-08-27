import React, { useContext } from "react";

import "twin.macro";
import { MoviesContext, MoviesContextShape } from "./Main";
import MovieTile from "./MovieTile";
import tw from "twin.macro";

const List = tw.ul`
  flex flex-col
  m-auto
  w-full md:w-10/12 lg:w-9/12 xl:w-7/12
  items-center
`;

function MoviesList() {
  const { movies } = useContext<MoviesContextShape>(MoviesContext);

  //todo: if there is no background, use default one

  return (
    <List>
      {movies.map((m) => (
        <MovieTile key={m.id} movie={m} />
      ))}
    </List>
  );
}

export default MoviesList;
