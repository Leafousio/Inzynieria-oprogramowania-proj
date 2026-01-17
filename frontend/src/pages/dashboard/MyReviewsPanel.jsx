import { useState, useEffect } from "react";
import { api } from "../../api/client";

export default function MyReviewsPanel({ token }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api
      .get("/users/me/reviews")
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your reviews</h2>

      {reviews.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500">You have no reviews</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map(r => (
            <div key={r.id} className="card p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={r.artwork?.blob_path}
                    alt="Artwork preview"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-medium mb-2">{r.content}</p>
                  <p className="text-sm text-gray-500">{r.created_at?.split("T")[0]}</p>
                  <p className="text-sm font-medium mt-2">Artwork: {r.artwork?.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}