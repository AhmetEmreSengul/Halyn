import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import GoogleSuccess from "./pages/GoogleSuccess";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ScanHistory from "./pages/ScanHistory";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <AiOutlineLoading3Quarters className="size-10" />
      </div>
    );
  }

  return (
    <div className="bg-emerald-600 text-white w-screen min-h-screen text-300 flex justify-center">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route path="/scan-history" element={<ScanHistory />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />
      </Routes>
    </div>
  );
};

export default App;
