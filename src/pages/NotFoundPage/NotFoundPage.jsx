import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
      <>
        <p>Ooops not found page</p>
        <p>
          Please visit out <Link to="/">Home page</Link>
        </p>
      </>
    );
}