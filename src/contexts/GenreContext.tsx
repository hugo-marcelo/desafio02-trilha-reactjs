import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from '../services/api';

interface GenreContextData {
  selectedGenreId: number;
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps;
  handleClickButton: (id: number) => void;
  setSelectedGenre: (selectedGenre: GenreResponseProps) => void
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreProviderProps {
  children: ReactNode;
}

export const GenreContext = createContext({} as GenreContextData);

export function GenreProvider({ children }: GenreProviderProps){
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {            
        setGenres(response.data);
    });
  }, []);

  useEffect(() => {    
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenreContext.Provider value={{
      selectedGenreId,
      genres,
      selectedGenre,
      handleClickButton,
      setSelectedGenre,
    }}>
      { children }
    </GenreContext.Provider>
  )
}
