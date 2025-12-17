const ALLOWED_GENRES = [
  "horror",
  "thriller",
  "suspense",
  "science fiction",
  "sci-fi",
  "film noir",
];

export function isAllowedGenre(genreString = "") {
  if (!genreString) return false;

  const lower = genreString.toLowerCase();

  return ALLOWED_GENRES.some((g) => lower.includes(g));
}
