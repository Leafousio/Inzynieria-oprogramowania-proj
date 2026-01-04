import { useEffect, useState } from "react";
import ReviewEditor from "../../components/ReviewEditor";

export default function ReviewArtwork() {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadArtwork() {
    setLoading(true);
    try {
      const res = await fetch("/api/artworks/random", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!res.ok) throw new Error("No artwork");
      setArtwork(await res.json());
    } catch (e) {
      setArtwork(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArtwork();
  }, []);

  if (loading) {
    return <div className="py-32 text-center">Loading artwork…</div>;
  }

  if (!artwork) {
    return (
      <div className="py-32 text-center text-muted">
        No artworks left to review.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
      {/* ARTWORK */}
      <div className="bg-neutral-100 flex items-center justify-center aspect-[3/2]">
        <img
          src={artwork.blob_path}
          alt={artwork.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* REVIEW */}
      <ReviewEditor artwork={artwork} onDone={loadArtwork} />
    </div>
  );
}
