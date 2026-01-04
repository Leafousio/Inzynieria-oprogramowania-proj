import { useEffect, useState } from "react";
import { api } from "../api/client";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/artworks/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}