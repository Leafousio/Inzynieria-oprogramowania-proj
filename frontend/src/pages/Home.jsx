import { useEffect, useState } from "react";
import ArtworkBanner from "../components/ArtworkBanner";


export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const requests = [0, 1, 2].map(() =>
          fetch("/api/artworks/public-random").then((r) => r.json())
        );

        const results = await Promise.all(requests);
        setArtworks(results);
      } catch (err) {
        console.error("Failed to load homepage artworks", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Loading gallery…</div>;
  }

  return (
  <div className="space-y-20 py-16">

   <section className="max-w-content space-y-4 mb-12">
  <h1 className="font-heading text-4xl">
    ArtReview
  </h1>
  <p className="text-muted text-lg">
    A community-driven platform where artists share their work
    and receive thoughtful written feedback from others.
  </p>
</section>

<ArtworkBanner artworks={artworks} />



  </div>
  );
}
