import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Sub-navbar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <NavLink
          end
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300"
            }`
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/artworks"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300"
            }`
          }
        >
          My Artworks
        </NavLink>

        <NavLink
          to="/dashboard/reviews"
          className={({ isActive }) =>
            `px-4 py-2 rounded transition-colors ${
              isActive 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300"
            }`
          }
        >
          My Reviews
        </NavLink>
      </div>

      {/* Page content rendered here */}
      <Outlet />
    </div>
  );
}