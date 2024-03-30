import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/types";

export interface FavoritesState {
  movies: Movie[];
  showFavorites: boolean;
}

const initialState: FavoritesState = {
  movies: [],
  showFavorites: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Добавление фильма в список избранных
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      // Проверяем, что фильма еще нет в списке избранных
      if (!state.movies.find((m) => m.imdbID === movie.imdbID)) {
        state.movies.push(movie);
      }
    },
    // Удаление фильма из списка избранных
    removeFavorite: (state, action: PayloadAction<string>) => {
      const imdbID = action.payload;
      state.movies = state.movies.filter((movie) => movie.imdbID !== imdbID);
    },
    // Переключение отображения списка избранных фильмов
    toggleShowFavorites: (state) => {
      state.showFavorites = !state.showFavorites;
    },
  },
});

// Экспортируем все созданные actions
export const { addFavorite, removeFavorite, toggleShowFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
