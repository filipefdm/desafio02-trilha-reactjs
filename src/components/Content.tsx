import { useEffect, useState } from "react";

import { MovieCard } from "./MovieCard";
import { Header } from "./Header";

import { api } from "../services/api";

import "../styles/content.scss";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type ContentProps = {
  genreId: number;
};

export function Content({ genreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then((response) => {
      setMovies(response.data);
    });
  }, [genreId]);

  return (
    <div className="container">
      <Header genreId={genreId} />
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
