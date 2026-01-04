import { useState } from "react";

export default function ReviewEditor({ artwork, onDone }) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  async function submitReview() {
    if (!content.trim()) return;

    setSending(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          artwork_id: artwork.id,
          content,
        }),
      });

      setContent("");
      onDone();
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl">
          {artwork.title}
        </h2>
        <p className="text-sm text-muted">
          {artwork.category}
        </p>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughtful review here…"
        className="w-full min-h-[240px] resize-none p-4 border border-border
                   focus:outline-none focus:ring-1 focus:ring-black
                   prose-content"
      />

      <div className="flex gap-4">
        <button
          onClick={submitReview}
          disabled={sending}
          className="bg-black text-white px-6 py-2 text-sm
                     disabled:opacity-50"
        >
          Submit review
        </button>

        <button
          onClick={onDone}
          className="text-sm underline text-muted"
        >
          Skip artwork
        </button>
      </div>
    </div>
  );
}
