// src/reducers/selectedMovieSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SelectedMovieState, initialSelectedMovieState } from "../types/types";

export const fetchSelectedMovie = createAsyncThunk(
  "selectedMovie/fetchSelectedMovie",
  async (imdbID: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=9713c5e7`
      );
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const selectedMovieSlice = createSlice({
  name: "selectedMovie",
  initialState: initialSelectedMovieState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSelectedMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSelectedMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error instanceof Error
            ? action.error.message
            : "Произошла ошибка";
      });
  },
});

export default selectedMovieSlice.reducer;
