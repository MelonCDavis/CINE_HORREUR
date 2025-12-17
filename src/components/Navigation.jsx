import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="theatre-nav">
      <div className="theatre-nav-inner">
        <div className="theatre-nav-title">Ciné Horreur</div>

        <div className="theatre-nav-links">
          <NavLink to="/" className="theatre-nav-link">
            Library
          </NavLink>
          <NavLink to="/search" className="theatre-nav-link">
            Search
          </NavLink>
          <NavLink to="/favorites" className="theatre-nav-link">
            Favorites
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
