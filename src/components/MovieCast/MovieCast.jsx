import { fetchCast } from "../../movies-api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieCast() {
  const { movieId } = useParams();
  const [castItem, setCastItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        const data = await fetchCast(movieId);
        setCastItem(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div>
      {error && <p>Sorry, please reload the page.</p>}
      {loading && <p>Loading cast list...</p>}
      <ul>
        {castItem.map((actor) => (
          <li key={actor.id}>
            <img
              src={"https://image.tmdb.org/t/p/w500${actor.profile_path}"}
              alt={actor.name}
            />
            <h2>{actor.name}</h2>
            <p>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
