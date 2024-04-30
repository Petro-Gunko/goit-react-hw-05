import MovieList from "../../conmponents/MovieList/MovieList";
import SearchFormMovies from "../../conmponents/SearchFormMovies/SearchFormMovies";
import { fetchSearchMovie } from "../../movies-api";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();
  const searchingMovie = params.get("newSearchQuery") ?? "";

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    try {
      setLoading(true);
      const data = await fetchSearchMovie(newQuery);
      setMovies(data.results);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const searchNewQuery = (newQuery) => {
    params.set("newSearchQuery", newQuery);
    setParams(params);
  };

  return (
    <div>
      <SearchFormMovies
        onSearch={handleSearch}
        value={searchingMovie}
        onSearch2={searchNewQuery}
      />
      {loading && <p>Loading movies list...</p>}
      {error && <p>No movies found</p>}
      {movies.length > 0 && <MovieList trendMovies={movies} />}
    </div>
  );
}
