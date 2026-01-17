import { useState, useEffect } from "react";
import { api } from "../../api/client";
import UploadForm from "../../components/UploadForm";
import ArtworkCard from "../../components/ArtworkCard";

// MUSI odpowiadać enumowi backendowemu
const CATEGORIES = [
  "digital painting",
  "traditional painting",
  "photography",
  "sculpture",
  "ceramics",
  "crafts",
];

export default function Overview() {
  const [artwork, setArtwork] = useState(null);
  const [noArtworkMessage, setNoArtworkMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [userStats, setUserStats] = useState({
    uploadsLeft: 0,
    reviewsLeft: 0,
    usedUploads: 0,
    usedReviews: 0,
    email: "",
  });

  // ===== USER STATS =====
  const fetchUserStats = async () => {
    try {
      const res = await api.get("/users/me/status");
      setUserStats({
        uploadsLeft: res.data.uploads_left,
        reviewsLeft: res.data.reviews_left,
        usedUploads: res.data.daily_upload_count,
        usedReviews: res.data.daily_review_count,
        email: res.data.email,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // ===== RANDOM ARTWORK =====
  const getRandom = async () => {
    try {
      const res = await api.get("/artworks/random", {
        params: selectedCategory ? { category: selectedCategory } : {},
      });

      setArtwork(res.data);
      setNoArtworkMessage("");
    } catch (error) {
      if (error.response?.status === 404) {
        setArtwork(null);
        setNoArtworkMessage(
          selectedCategory
            ? "No artworks to review in this category"
            : "No artworks to review"
        );
      } else {
        console.error("Error fetching random artwork:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">
        ArtReview Panel
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Upload Artwork
          </h2>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p>
              Daily uploads left:{" "}
              <span className="font-bold text-blue-600">
                {userStats.uploadsLeft}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Used today: {userStats.usedUploads}
            </p>
          </div>

          <UploadForm onUploadSuccess={fetchUserStats} />
        </div>

        {/* ===== REVIEW SECTION ===== */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Review Artwork
          </h2>

          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <p>
              Daily reviews left:{" "}
              <span className="font-bold text-purple-600">
                {userStats.reviewsLeft}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Used today: {userStats.usedReviews}
            </p>
          </div>

          {/* CATEGORY SELECT */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          >
            <option value="">Any category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={getRandom}
            className="btn btn-primary w-full mb-4"
          >
            Get Random Artwork
          </button>

          {noArtworkMessage && (
            <div className="p-3 mb-4 bg-yellow-100 text-yellow-800 rounded">
              {noArtworkMessage}
            </div>
          )}

          {artwork && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">
                Artwork to Review:
              </h3>
              <ArtworkCard
                artwork={artwork}
                onReviewAdded={() => {
                  fetchUserStats();
                  setArtwork(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
