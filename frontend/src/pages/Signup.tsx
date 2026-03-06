import { useState, type FormEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

const Login = () => {
  const { signup, isSigninUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 size-80 md:size-100 justify-center"
      >
        <h1>Welcome</h1>
        <div className="space-y-4">
          <input
            className="p-4 w-full border rounded-lg"
            placeholder="FullName"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          <input
            className="p-4 w-full border rounded-lg"
            placeholder="Email"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className="p-4 w-full border rounded-lg"
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button
          className="bg-teal-900 text-white p-4 rounded-lg cursor-pointer"
          type="submit"
        >
          {isSigninUp ? "Signing up" : "Signup"}
        </button>
        <button
          className="bg-teal-900 text-white p-4 rounded-lg flex items-center justify-center gap-3"
          type="submit"
          onClick={handleGoogleLogin}
        >
          Continue with <FaGoogle size={20} />
        </button>
        <div>
          Already have an account?{" "}
          {
            <Link to={"/login"} className="underline">
              Log in
            </Link>
          }
        </div>
      </form>
    </div>
  );
};

export default Login;
