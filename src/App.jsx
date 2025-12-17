import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LibraryProvider } from "./context/LibraryContext";
import TheatreLayout from "./layouts/TheatreLayout";

import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";

import Library from "./pages/Library";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <LibraryProvider>
        <TheatreLayout>
          <ErrorBoundary>
            <Navigation />

            <Routes>
              <Route path="/" element={<Library />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </TheatreLayout>
      </LibraryProvider>
    </BrowserRouter>
  );
}
