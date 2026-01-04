import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"
import { setAuthToken } from "./api/client"
import MyArtworksPanel from "./pages/dashboard/MyArtworksPanel";
import Overview from "./pages/dashboard/Overview";
import MyReviewsPanel from "./pages/dashboard/MyReviewsPanel";
import ReviewArtwork from "./pages/dashboard/ReviewArtwork";



export default function App() {
  useEffect(() => {
    // Przywracanie tokenu z localStorage przy załadowaniu aplikacji
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="page-container">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="artworks" element={<MyArtworksPanel />} />
              <Route path="reviews" element={<MyReviewsPanel />} />
              <Route path="/dashboard/review" element={<ReviewArtwork />} />
            </Route>
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white p-6 text-center">
          <p>&copy; {new Date().getFullYear()} ArtReview</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}