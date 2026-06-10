import useAuthStore from "@/store/authStore";
import { memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default memo(function Nav() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `btn btn-ghost btn-sm ${isActive ? "!text-accent border-accent/30" : ""}`;

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border bg-bg/80 backdrop-blur-md"
    >
      {/* Brand */}
      <NavLink
        to={user ? "/notes" : "/login"}
        className="flex items-center gap-2 font-display text-xl text-accent
       tracking-wide hover:opacity-80 transition-opacity"
      >
        <LockIcon />
        Secure Notes
      </NavLink>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <NavLink to="/notes" className={linkClass}>
              Notes
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              Products
            </NavLink>
            <Avatar name={user.name} onClick={() => navigate("/profile")} />
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className="btn btn-primary btn-sm">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
});

function Avatar({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-full bg-accent text-bg font-display
                 text-sm flex items-center justify-center hover:bg-accent2
                 transition-colors cursor-pointer"
    >
      {name?.[0]?.toUpperCase()}
    </button>
  );
}

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
