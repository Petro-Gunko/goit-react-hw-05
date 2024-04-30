import { fetchMovieById } from "../../movies-api";
import { Suspense } from "react";
import css from "./MovieDetailsPage.module.css";
import { useEffect, useRef, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/movies");

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      {error && <p>please visit our Home page</p>}
      {loading && <p>Loading movie...</p>}
      <button className={css.btn}>
        <Link to={backLinkURLRef.current} className={css.btnLink}>
          Go back
        </Link>
      </button>

      {movie && (
        <div>
          <div className={css.wrap}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
              className={css.img}
            />
            <div>
              <div className={css.titleWrap}>
                <h1>{movie.original_title}</h1>
                <h2>({movie.release_date.slice(0, 4)})</h2>
              </div>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>

              <h2>Genres</h2>
              <ul className={css.genresList}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={<b>Loading nested route...</b>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
