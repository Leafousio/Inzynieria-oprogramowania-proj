import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 bg-white
        transition-shadow duration-300
        ${scrolled ? "shadow-md" : "shadow-none"}
      `}
    >
      <div className="max-w-page mx-auto px-8 py-6 flex items-center justify-between">
       
        <NavLink
          to="/"
          className="font-heading text-2xl tracking-wide text-foreground"
        >
          ArtReview
        </NavLink>

   
        <div className="flex gap-10 text-sm uppercase tracking-wide">
          {[
            { to: "/login", label: "Login" },
            { to: "/register", label: "Register" },
            { to: "/dashboard", label: "Dashboard" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="group relative pb-2"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted group-hover:text-foreground"
                    }`}
                  >
                    {label}
                  </span>

               
                  {!isActive && (
                    <span
                      className="
                        absolute left-0 -bottom-px h-px w-full
                        bg-foreground opacity-0
                        group-hover:opacity-30
                        transition-opacity
                      "
                    />
                  )}

                
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="
                        absolute left-0 right-0 -bottom-px
                        h-px bg-foreground
                      "
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
