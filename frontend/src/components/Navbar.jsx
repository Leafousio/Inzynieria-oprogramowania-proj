import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-md p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-gray-700">
          ArtReview
        </Link>
        <div className="flex space-x-4">
          <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
          <Link to="/register" className="hover:text-blue-600 transition-colors">Register</Link>
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        </div>
      </div>
    </motion.nav>
  );
}