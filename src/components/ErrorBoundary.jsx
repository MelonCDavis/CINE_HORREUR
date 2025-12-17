import React from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ padding: 20 }}>
        <div className="theatre-error-panel">
          <h2 className="theatre-error-title">🎭 Something went wrong</h2>

          <p className="theatre-error-text">
            The app hit an unexpected error while rendering this page.
          </p>

          {import.meta.env.DEV && this.state.error?.message && (
            <pre className="theatre-error-details">
              {this.state.error.message}
            </pre>
          )}

          <div className="theatre-error-actions">
            <button className="theatre-error-btn" onClick={this.handleReset}>
              Try again
            </button>

            <Link className="theatre-error-link" to="/" onClick={this.handleReset}>
              Go to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
