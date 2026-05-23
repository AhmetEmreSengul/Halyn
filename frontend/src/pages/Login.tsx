import { useState, type ChangeEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaEye, FaEyeSlash, FaFish, FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

const Login = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [isVisible, setIsVisible] = useState(false);
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
          <div className="relative">
            <input
              className="p-4 w-full border-2 rounded-lg"
              placeholder="Password"
              type={isVisible ? "text" : "password"}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <span className="absolute top-1/3 right-5">
              {isVisible ? (
                <FaEye className="size-6" onClick={() => setIsVisible(false)} />
              ) : (
                <FaEyeSlash
                  className="size-6"
                  onClick={() => setIsVisible(true)}
                />
              )}
            </span>
          </div>
        </div>
        <button
          className="bg-white hover:bg-transparent text-black hover:text-white border-2 border-white p-4 rounded-lg cursor-pointer transition"
          type="submit"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        <Link
          to={"/forgot-password"}
          className="inline-flex items-center gap-2 underline hover:text-green-200 transition cursor-pointer"
        >
          Forgot Password? <FaFish className="size-7" />
        </Link>
        <button
          className="border-2 border-white hover:bg-white text-white hover:text-black p-4 rounded-lg flex items-center justify-center gap-3 cursor-pointer transition"
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
