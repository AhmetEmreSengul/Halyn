import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        await checkAuth();
        navigate("/");
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      }
    };

    handleSuccess();
  }, [checkAuth, navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-emerald-600 text-white">
      <AiOutlineLoading3Quarters className="animate-spin size-10" />
    </div>
  );
};

export default GoogleSuccess;
