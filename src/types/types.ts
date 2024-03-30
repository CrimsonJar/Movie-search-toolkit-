import type { SearchProps } from "antd/es/input/Search";

// types/types.ts
export interface AppLayoutProps {
  onSearch: (value: string) => void;
}
export interface Movie {
  imdbID: string | null | undefined;
  id: string;
  Title: string;
  Poster: string;
  Year: string;
  Genre: string;
  Runtime: string;
  Director: string;
  Actors: string;
  imdbRating: string;
}

export interface MovieState {
  data: MoviesApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const initialMovieState: MovieState = {
  data: null,
  error: null,
  isLoading: false,
};

export interface FetchMovieArgs {
  searchValue: string;
  searchType: string;
}

// Начальное состояние избранных фильмов
export interface FavoriteMoviesState {
  favorites: Movie[];
}

export interface MoviesApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface SelectedMovieState {
  data: Movie | null;
  error: string | null;
  isLoading: boolean;
}

// Уникальное имя для начального состояния SelectedMovieState
export const initialSelectedMovieState: SelectedMovieState = {
  data: null,
  error: null,
  isLoading: false,
};
