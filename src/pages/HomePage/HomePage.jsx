import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../conmponents/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      {error && <p>please visit our Movies page</p>}
      {loading && <p>Loading movies...</p>}
      {movies.length > 0 && (
        <div>
          <p>Trending today</p>
          <MovieList trendMovies={movies} />
        </div>
      )}
    </div>
  );
}
