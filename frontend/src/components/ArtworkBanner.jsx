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
          <div className="art-marquee__item group">
          {artwork.blob_path && (
            <>
              <img
                src={artwork.blob_path}
                alt={artwork.title}
                draggable={false}
              />

              {/* overlay */}
              <div
                onClick={() => handleClick()}
                className="absolute inset-0 bg-black/30 opacity-0 
                          group-hover:opacity-100 transition-opacity
                          flex items-center justify-center
                          cursor-pointer"
              >
                <span className="text-white text-sm tracking-wide border border-white px-4 py-2">
                  Review this artwork
                </span>
              </div>
            </>
          )}
        </div>
        ))}
      </div>
    </section>
  );
}
