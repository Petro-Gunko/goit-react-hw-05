import { fetchReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewItem, setReviewItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setLoading(true);
        const data = await fetchReviews(movieId);
        setReviewItem(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <div>
      {error && <p>We don`t have any reviews for this movie.</p>}
      {loading && <p>Loading reviews list...</p>}
      {reviewItem.length === 0 && (
        <p>We don`t have any reviews for this movie.</p>
      )}
      <ul>
        {reviewItem.map((review) => (
          <li key={review.id}>
            <h2>Author {review.author}</h2>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
