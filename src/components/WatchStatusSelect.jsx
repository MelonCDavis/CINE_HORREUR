export default function WatchStatusSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="want-to-watch">Want to Watch</option>
      <option value="watching">Watching</option>
      <option value="watched">Watched</option>
    </select>
  );
}
