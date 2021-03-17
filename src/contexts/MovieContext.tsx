import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { GenreContext } from "./GenreContext";

interface MovieContextData{
  movies: MovieProps[]
}

interface MovieProviderProps {
  children: ReactNode
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  imdbID: string;
}  

export const MovieContext = createContext({} as MovieContextData)

export function MovieProvider({ children }: MovieProviderProps){
  const { selectedGenreId } = useContext(GenreContext);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return(
    <MovieContext.Provider value={{ movies }}>
      {children}
    </MovieContext.Provider>
  )
}
