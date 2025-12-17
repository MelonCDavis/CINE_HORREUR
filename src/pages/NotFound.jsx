import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 16, textAlign: "center" }}>
      <h2>404</h2>
      <p>This page has sunk into the abyss.</p>

      <Link to="/" className="theatre-nav-link">
        Go home
      </Link>
    </div>
  );
}
