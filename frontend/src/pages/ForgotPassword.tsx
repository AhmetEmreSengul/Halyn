import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ForgotPassword = () => {
  const { forgotPassword } = useAuthStore();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-5">Forgot Password</h1>
      <form
        className="w-sm bg-gray-700/70 rounded-2xl p-6 flex flex-col gap-5 items-center justify-center"
        onSubmit={handleForgotPassword}
      >
        <input
          className="border-2 rounded-lg p-3 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-3 rounded-lg border hover:bg-white hover:text-black transition cursor-pointer "
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
