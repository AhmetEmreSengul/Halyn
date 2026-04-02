import { useState } from "react";
import { useParams } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const ResetPassword = () => {
  const { resetPassword } = useAuthStore();
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleResetPassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (token) {
      await resetPassword(token, password);
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-5">Reset Password</h1>

      <form
        onSubmit={handleResetPassword}
        className="w-sm bg-gray-700/70 rounded-2xl p-6 flex flex-col gap-5 items-center justify-center"
      >
        <input
          className="border-2 rounded-lg p-3 w-full"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-3 rounded-lg border hover:bg-white hover:text-black transition cursor-pointer "
        >
          Reset My Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
