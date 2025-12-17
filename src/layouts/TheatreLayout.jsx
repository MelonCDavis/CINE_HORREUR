import "./TheatreLayout.css";

export default function TheatreLayout({ children }) {
  return (
    <>
      <div className="theatre-bg" />

      <header className="theatre-header" />

      <main className="theatre-content">
        <div className="theatre-stage">{children}</div>
      </main>

      <div className="theatre-curtain-overlay">
        <div className="curtain curtain-left" />
        <div className="curtain curtain-right" />
      </div>
    </>
  );
}
