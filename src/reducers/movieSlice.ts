import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MovieState, FetchMovieArgs } from "../types/types";

const initialState: MovieState = {
  data: null,
  error: null,
  isLoading: false,
};

export const fetchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async ({ searchValue, searchType }: FetchMovieArgs, { rejectWithValue }) => {
    try {
      const searchParam = searchType === "title" ? "s" : "i";
      const response = await axios.get(
        `http://www.omdbapi.com/?${searchParam}=${searchValue}&plot=full&apikey=9713c5e7`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Произошла неизвестная ошибка";
        }
      });
  },
});

export default movieSlice.reducer;
