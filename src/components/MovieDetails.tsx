// MovieDetails.tsx
import React from "react";
import { Card, Col, Image, Row } from "antd";
import { Movie } from "../types/types";
import "./css/AppContent.css";
interface MovieDetailsProps {
  movie: Movie;
  onBackClick: () => void;
  onAddFavorite: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onBackClick,
  onAddFavorite,
}) => {
  const { Title, Poster, Year, Genre, Runtime, Director, Actors, imdbRating } =
    movie;

  return (
    <div className='movie-details'>
      <Card hoverable className='selected-movie-card'>
        <Row gutter={16}>
          <Col span={6}>
            <Image alt={Title} src={Poster} className='poster-image' />
            <button
              onClick={onBackClick}
              style={{ width: "100%", marginTop: "16px" }}
            >
              Назад
            </button>
            <button
              onClick={onAddFavorite}
              style={{ width: "100%", marginTop: "16px" }}
            >
              + в избранное
            </button>
          </Col>
          <Col span={18}>
            <h1>{Title}</h1>
            <p>Year: {Year}</p>
            <p>Genre: {Genre}</p>
            <p>Runtime: {Runtime}</p>
            <p>Director: {Director}</p>
            <p>Actors: {Actors}</p>
            <p>imdbRating: {imdbRating}</p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MovieDetails;
