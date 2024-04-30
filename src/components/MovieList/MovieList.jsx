import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ trendMovies }) {
  const location = useLocation();
  return (
    <div>
      <ul>
        {trendMovies.map((trendMovie) => (
          <li key={trendMovie.id}>
            <p>
              <Link to={`/movies/${trendMovie.id}`} state={location}>
                {trendMovie.title}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
