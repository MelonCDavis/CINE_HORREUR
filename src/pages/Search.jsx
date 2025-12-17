import { useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { useLibrary } from "../hooks/useLibrary";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const { searchMovies, loading, error } = useAPI();
  const { addItem, items } = useLibrary();

  const activeItem = results.find((x) => x.id === activeId);
  const isAdded = (id) => items.some((x) => x.id === id);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const data = await searchMovies(query);
    setResults(data);
    setActiveId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSearch} className="theatre-search-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search horror, sci-fi, noir…"
          className="theatre-search-input"
        />
        <button type="submit" className="theatre-search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading…</p>}

      {error && (
        <div className="theatre-error-panel" style={{ marginTop: 16 }}>
          <h3 className="theatre-error-title">Search failed</h3>
          <p className="theatre-error-text">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className={`poster-grid ${activeId ? "spotlight-active" : ""}`}>
            {results.map((movie) => (
              <div
                key={movie.id}
                className={`poster-card ${
                  activeId === movie.id ? "active" : ""
                }`}
                onClick={() => setActiveId(movie.id)}
              >
                {movie.thumbnail && (
                  <img src={movie.thumbnail} alt={movie.title} />
                )}
                <h4>{movie.title}</h4>
              </div>
            ))}
          </div>

          {activeItem && (
            <div
              className="spotlight-overlay"
              onClick={() => setActiveId(null)}
            >
              <div
                className="spotlight-card"
                onClick={(e) => e.stopPropagation()}
              >
                {activeItem.thumbnail && (
                  <img
                    src={activeItem.thumbnail}
                    alt={activeItem.title}
                    style={{ width: "200px", float: "left", marginRight: 16 }}
                  />
                )}

                <h2 style={{ marginTop: 0 }}>
                  {activeItem.title}
                  {activeItem.year && <span> ({activeItem.year})</span>}
                </h2>

                <p><strong>Director:</strong> {activeItem.director}</p>
                <p><strong>Genre:</strong> {activeItem.genre}</p>
                <p><strong>Runtime:</strong> {activeItem.runtime}</p>
                <p><strong>IMDb:</strong> ⭐ {activeItem.imdbRating}</p>
                <p>{activeItem.plot}</p>

                <div style={{ marginTop: 12 }}>
                  <button
                    onClick={() => addItem(activeItem)}
                    disabled={isAdded(activeItem.id)}
                  >
                    {isAdded(activeItem.id)
                      ? "✓ In Library"
                      : "＋ Add to Library"}
                  </button>

                  <button
                    onClick={() => setActiveId(null)}
                    style={{ marginLeft: 8 }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
