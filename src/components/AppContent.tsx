// AppContent.tsx
import React, { useState } from "react";
import { Spin, Pagination, Row } from "antd";
import { Content } from "antd/es/layout/layout";

import { RootState } from "../store";
import "./css/AppContent.css";

import { useDispatch, useSelector } from "../hooks";
import { fetchSelectedMovie } from "../reducers/selectedMovieSlice";
import { Movie } from "../types/types";
import { addFavorite, removeFavorite } from "../reducers/favoriteMoviesSlice";

import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import type { AppLayoutProps } from "../types/types";

const AppContent: React.FC<AppLayoutProps> = ({ onSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const dispatch = useDispatch();

  const movies = useSelector((state: RootState) => state.movie.data?.Search);
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);
  const error = useSelector((state: RootState) => state.movie.error);
  const showFavorites = useSelector(
    (state: RootState) => state.favoriteMovies.showFavorites
  );
  const searchFailed = useSelector(
    (state: RootState) => state.movie.data?.Response === "False"
  );
  const favoriteMovies = useSelector(
    (state: RootState) => state.favoriteMovies.movies
  );
  const selectedMovie = useSelector(
    (state: RootState) => state.selectedMovie.data as Movie
  );
  const [showDetails, setShowDetails] = useState(false);

  const handleFetchMovieDetails = (imdbID: string) => {
    dispatch(fetchSelectedMovie(imdbID));
    setShowDetails(true);
  };

  const handleAddToFavorites = () => {
    if (selectedMovie) {
      dispatch(addFavorite(selectedMovie));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const moviesToDisplay = showFavorites
    ? favoriteMovies
    : movies?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (isLoading) {
    return <Spin tip='Загрузка...' size='large' />;
  }

  if (showDetails && selectedMovie) {
    return (
      <MovieDetails
        movie={selectedMovie}
        onBackClick={() => setShowDetails(false)}
        onAddFavorite={handleAddToFavorites}
      />
    );
  }

  return (
    <Content style={{ padding: "0 48px" }}>
      <div className='content-wrapper'>
        {error && <p>Ошибка: {error}</p>}
        <h2>{showFavorites ? "Избранное" : "Найденные фильмы"}</h2>
        <Row gutter={[16, 16]} wrap={true}>
          {!isLoading && searchFailed && !showFavorites && (
            <p>Фильмы с таким названием не найдены.</p>
          )}
          {moviesToDisplay &&
            moviesToDisplay.map((movie: Movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onDetailsClick={handleFetchMovieDetails}
                onRemoveFavorite={(imdbID: string) =>
                  dispatch(removeFavorite(imdbID))
                }
                showFavorites={showFavorites}
              />
            ))}
        </Row>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={showFavorites ? favoriteMovies.length : movies?.length || 0}
          onChange={handlePageChange}
        />
      </div>
    </Content>
  );
};

export default AppContent;
