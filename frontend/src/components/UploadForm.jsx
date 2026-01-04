import React, { useState } from "react";
import { api } from "../api/client";
import { useCategories } from "../hooks/useCategories";
const CATEGORIES = [
  "digital painting", "traditional painting", "photography", 
  "sculpture", "ceramics", "crafts"
];

const UploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState(null);
  const { categories } = useCategories(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Wybierz plik!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);

    try {
      await api.post("/artworks/upload", formData);
      onUploadSuccess();
      setTitle("");
    } catch (err) {
      alert("Błąd uploadu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded">
      <input 
        className="w-full p-2 border" 
        placeholder="Tytuł" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
     <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Wyślij</button>
    </form>
  );
};

// KLUCZOWA LINIA:
export default UploadForm;