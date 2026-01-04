import { useState } from "react";
import { api } from "../api/client";
import { API_BASE_URL } from "../api/config";


export default function ArtworkCard({ artwork, onReviewAdded }) {
  const [reviewContent, setReviewContent] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [message, setMessage] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewContent.trim()) return;

    try {
      await api.post("/reviews", {
        artwork_id: artwork.id,
        content: reviewContent,
      });

      setMessage("Recenzja dodana pomyślnie!");
      setReviewContent("");
      setShowReviewForm(false);

      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      console.error(error);
      setMessage("Błąd podczas dodawania recenzji. Spróbuj ponownie.");
    }
  };

  return (
    <div className="card overflow-hidden">
      {/* IMAGE */}
      <div className="max-h-64 overflow-hidden bg-gray-100">
      <img src={artwork.blob_path}
        alt={artwork.title}
        className="artwork-image"
      />

      </div>

      <div className="p-4">
        {/* INFO */}
        <h3 className="text-xl font-semibold mb-1">{artwork.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          Kategoria: {artwork.category}
        </p>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">ID: {artwork.id}</span>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn btn-primary text-sm"
          >
            Dodaj recenzję
          </button>
        </div>

        {/* REVIEW FORM */}
        {showReviewForm && (
          <form onSubmit={submitReview} className="mt-4">
            <textarea
              className="form-input"
              rows="4"
              placeholder="Napisz recenzję (minimum 80 słów)..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />

            <div className="flex justify-between mt-3 gap-2">
              <button type="submit" className="btn btn-primary flex-1">
                Wyślij
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="btn btn-secondary flex-1"
              >
                Anuluj
              </button>
            </div>
          </form>
        )}

        {/* STATUS MESSAGE */}
        {message && (
          <div className="mt-3 p-3 bg-blue-100 text-blue-700 rounded-lg text-sm">
            {message}
          </div>
        )}
        {Array.isArray(artwork.reviews) && artwork.reviews.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold mb-3 text-sm">
              Recenzje ({artwork.reviews.length})
            </h4>

            <ul className="space-y-3 text-sm">
              {artwork.reviews.map((review) => (
                <li key={review.id} className="bg-gray-50 p-3 rounded">
                  <p className="mb-1">{review.content}</p>
                  <p className="text-xs text-gray-500">
                    Autor ID: {review.author_id}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
