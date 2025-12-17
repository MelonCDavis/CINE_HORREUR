import { useState } from "react";
import { isAllowedGenre } from "../utils/genreFilter";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (query) => {
    if (!query) return [];

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.Response === "False") {
        setError(data.Error || "Search failed");
        return [];
      }

      const detailed = await Promise.all(
        data.Search.map(async (item) => {
          const r = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&i=${item.imdbID}&plot=short`
          );
          const d = await r.json();

          return {
            id: d.imdbID,
            title: d.Title,
            year: d.Year,
            director: d.Director,
            actors: d.Actors,
            genre: d.Genre,
            runtime: d.Runtime,
            imdbRating: d.imdbRating,
            plot: d.Plot,
            thumbnail: d.Poster !== "N/A" ? d.Poster : null,
          };
        })
      );

      return detailed.filter((movie) =>
        isAllowedGenre(movie.genre)
      );
    } catch (err) {
      setError("Network error while searching movies");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { searchMovies, loading, error };
}
