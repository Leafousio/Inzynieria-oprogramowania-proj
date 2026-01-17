import { useState, useEffect } from "react";
import { api } from "../../api/client";

export default function MyArtworksPanel({ token }) {
  const [artworks, setArtworks] = useState([]);
   const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    api
      .get("/users/me/artworks")
      .then(res => setArtworks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Artworks</h2>

      {artworks.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500">No Artworks yet</p>
        </div>
      ) : (
        <div className="responsive-grid">
          {artworks.map(a => (
            <div key={a.id} className="card overflow-hidden">
              <div className="max-h-48 overflow-hidden bg-gray-100">
                <img
                  src={a.blob_path}
                  alt={a.title}
                  className="artwork-image"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-gray-600 mb-2">Category: {a.category}</p>
                <button
                className="text-sm text-blue-600 underline"
                onClick={() =>
                  setExpanded(expanded === a.id ? null : a.id)
                }
               >
                Reviews: {a.reviews?.length ?? 0}
              </button>
              {expanded === a.id && a.reviews?.length > 0 && (
                <div className="mt-3 space-y-2 text-sm">
                  {a.reviews.map((r) => (
                    <div key={r.id} className="bg-gray-100 p-2 rounded">
                      <p>{r.content}</p>
                       
                       
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}