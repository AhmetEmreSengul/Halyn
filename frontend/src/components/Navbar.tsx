import { Link } from "react-router";
import { navItems } from "../Data";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="fixed md:top-5 md:rounded-full w-screen md:w-5xl md:container h-25 md:h-17 bg-green-900/20 backdrop-blur-sm flex items-center justify-between px-5 md:px-26 z-10">
      <Link to={"/"} className="font-bold text-3xl ">
        Halyn
      </Link>

      <div className="flex items-center gap-5">
        {navItems.map((item) => {
          if (!authUser && item.protected) {
            return null;
          }

          return (
            <div className="hover:text-stone-200 transition" key={item.link}>
              <Link to={item.link}> {item.title} </Link>
            </div>
          );
        })}
        {authUser ? (
          <button
            className="cursor-pointer hover:text-stone-200 transition"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link className="cursor-pointer" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
