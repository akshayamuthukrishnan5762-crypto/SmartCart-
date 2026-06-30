import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404</h1>

      <h2>Oops! Page Not Found</h2>

      <p>
        The page you are looking for doesn't exist.
      </p>

      <Link to="/">
        <button>🏠 Back to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;