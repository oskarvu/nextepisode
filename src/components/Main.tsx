import React, { useState, createContext, useEffect } from "react";
import tw from "twin.macro";

import { Movie } from "../api/types";

import Header from "./Header";
import MoviesList from "./MoviesList";
import Footer from "./Footer";

const MainContainer = tw.div`
  min-h-screen
  bg-gray-200
`;

export interface MoviesContextShape {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const defaultContext = { movies: [], setMovies: () => {} };
export const MoviesContext = createContext<MoviesContextShape>(defaultContext);

export default function Main() {
  const localData = localStorage.getItem("movies");
  const initialMovies = () =>
    localData ? (JSON.parse(localData) as Movie[]) : ([] as Movie[]);
  const [movies, setMovies] = useState(initialMovies);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <MainContainer>
      <MoviesContext.Provider value={{ movies, setMovies }}>
        <Header />
        <MoviesList />
      </MoviesContext.Provider>
      <Footer />
    </MainContainer>
  );
}
