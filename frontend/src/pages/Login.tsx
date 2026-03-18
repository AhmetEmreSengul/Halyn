import { useState, type ChangeEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const handleSubmit = (e: ChangeEvent) => {
    e.preventDefault();
    login(formData);
    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 size-80 md:size-100 justify-center"
      >
        <h1 className="text-3xl">Welcome Back</h1>
        <div className="space-y-4">
          <input
            className="p-4 w-full border-2 rounded-lg"
            placeholder="Email"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            className="p-4 w-full border-2 rounded-lg"
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button
          className="bg-stone-300 hover:bg-stone-500 text-black hover:text-white p-4 rounded-lg cursor-pointer transition"
          type="submit"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        <button
          className="border-2 border-stone-300 hover:border-stone-500 text-white p-4 rounded-lg flex items-center justify-center gap-3 cursor-pointer transition"
          type="button"
          onClick={handleGoogleLogin}
        >
          Continue with <FaGoogle size={20} />
        </button>
        <div>
          Don't have an account?{" "}
          {
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          }
        </div>
      </form>
    </div>
  );
};

export default Login;
