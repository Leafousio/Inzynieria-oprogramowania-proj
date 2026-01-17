import { useNavigate } from "react-router-dom";
export default function ArtworkBanner({ artworks }) {
  if (!artworks || artworks.length === 0) return null;
  const navigate = useNavigate();

function handleClick() {
  const token = localStorage.getItem("access_token");

  if (token) {
    navigate("/dashboard/review");
  } else {
    navigate("/login");
  }
}
  return (
    <section className="art-marquee">
        <div className="art-marquee__track">
      {[...artworks, ...artworks].map((artwork, idx) => (
        <div
          key={`${artwork.id}-${idx}`}
          className="art-marquee__item group"
        >
          {artwork.blob_path && (
            <>
              <img
                src={artwork.blob_path}
                alt={artwork.title}
                draggable={false}
              />

              
            </>
          )}
        </div>
      ))}
    </div>
    </section>
  );
}
