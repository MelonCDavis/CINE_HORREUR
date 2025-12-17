import { useState } from "react";
import { useLibrary } from "../hooks/useLibrary";
import WatchStatusSelect from "../components/WatchStatusSelect";
import { isAllowedGenre } from "../utils/genreFilter";

export default function Library() {
  const { items, removeItem, toggleFavorite, updateItem } = useLibrary();

  const [activeId, setActiveId] = useState(null);

  const filteredItems = items.filter(
    (item) => item.genre && isAllowedGenre(item.genre)
  );

  const activeItem = filteredItems.find((x) => x.id === activeId);

  return (
    <div style={{ padding: 20 }}>

      {filteredItems.length === 0 ? (
        <div className="theatre-empty-state">
          No films have entered the archive yet.
        </div>

      ) : (
        <>
          <div className={`poster-grid ${activeId ? "spotlight-active" : ""}`}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`poster-card ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => setActiveId(item.id)}
              >
                {item.thumbnail && (
                  <img src={item.thumbnail} alt={item.title} />
                )}
                <h4>{item.title}</h4>
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

                <label>
                  Status:{" "}
                  <WatchStatusSelect
                    value={activeItem.watchStatus}
                    onChange={(status) =>
                      updateItem(activeItem.id, { watchStatus: status })
                    }
                  />
                </label>

                <div style={{ marginTop: 12 }}>
                  <button
                    onClick={() => toggleFavorite(activeItem.id)}
                    disabled={activeItem.watchStatus !== "watched"}
                  >
                    {activeItem.isFavorite ? "★ Unfavorite" : "☆ Favorite"}
                  </button>

                  <button
                    onClick={() => removeItem(activeItem.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => setActiveId(null)}
                    style={{ marginLeft: 8 }}
                  >
                    Close
                  </button>
                </div>

                {activeItem.watchStatus !== "watched" && (
                  <p style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>
                    You can favorite a movie once it’s watched
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
