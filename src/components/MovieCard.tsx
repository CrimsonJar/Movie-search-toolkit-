// MovieCard.tsx
import React from "react";
import { Card, Col, Image } from "antd";
import { Movie } from "../types/types";
import "./css/AppContent.css";

interface MovieCardProps {
  movie: Movie;
  onDetailsClick: (imdbID: string) => void;
  onRemoveFavorite: (imdbID: string) => void;
  showFavorites: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onDetailsClick,
  onRemoveFavorite,
  showFavorites,
}) => {
  const { Title, Year, Poster, imdbID } = movie;

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <Card
        className='box-content'
        title={Title}
        hoverable
        cover={<Image className='ant-image-img' alt={Title} src={Poster} />}
      >
        <p>Year: {Year}</p>
        {showFavorites ? (
          <button onClick={() => imdbID && onRemoveFavorite(imdbID)}>
            Удалить из избранного
          </button>
        ) : (
          <button onClick={() => imdbID && onDetailsClick(imdbID)}>
            Подробнее
          </button>
        )}
      </Card>
    </Col>
  );
};

export default MovieCard;
