import React, { createContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const LibraryContext = createContext(null);

const STORAGE_KEY = "cine_horror_items_v1";

export function LibraryProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEY, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addItem = (item) => {
    setItems((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      if (exists) return prev;

      return [
        {
          ...item,
          isFavorite: false,
          watchStatus: "want-to-watch",
          dateAdded: Date.now(),
        },
        ...prev,
      ];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const updateItem = (id, patch) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, ...patch } : x))
    );
  };

  const toggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        if (x.watchStatus !== "watched") return x;
        return { ...x, isFavorite: !x.isFavorite };
      })
    );
  };

  const value = useMemo(
    () => ({
      items,
      loading,
      error,
      setLoading,
      setError,
      addItem,
      removeItem,
      updateItem,
      toggleFavorite,
    }),
    [items, loading, error]
  );

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}
