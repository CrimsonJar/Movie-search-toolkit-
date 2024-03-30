// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import favoriteMoviesReducer from "./favoriteMoviesSlice";
import selectedMovieSlice from "./selectedMovieSlice";

const rootReducer = combineReducers({
  movie: movieReducer,
  favoriteMovies: favoriteMoviesReducer,
  selectedMovie: selectedMovieSlice,
});

export default rootReducer;
