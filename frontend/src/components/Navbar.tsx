import { Link } from "react-router";
import { navItems } from "../Data";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="fixed top-0 w-full h-30 bg-teal-900 flex items-center justify-between px-3 md:px-20 z-10">
      <Link to={"/"} className="font-bold text-4xl italic">
        Halyn
      </Link>

      <div className="flex items-center gap-5">
        {navItems.map((item) => {
          if (!authUser && item.protected) {
            return null;
          }

          return (
            <div key={item.link}>
              <Link to={item.link}> {item.title} </Link>
            </div>
          );
        })}
        {authUser ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
