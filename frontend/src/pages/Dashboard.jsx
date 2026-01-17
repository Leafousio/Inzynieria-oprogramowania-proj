import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="max-w-page mx-auto px-8 py-10">
   
      <div className="flex gap-12 border-b border-border mb-12 text-sm uppercase tracking-wide">
        {[
          { to: "/dashboard", label: "Overview", end: true },
          { to: "/dashboard/artworks", label: "My Artworks" },
          { to: "/dashboard/reviews", label: "My Reviews" },
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="relative pb-3"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </span>

                {isActive && (
                  <motion.span
                    layoutId="dashboard-underline"
                    className="absolute left-0 right-0 -bottom-px h-px bg-foreground"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
