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
import AdminDashboard from "./pages/AdminDashboard";
import UserActivity from "./pages/UserActivity";
import ManageProducts from "./pages/ManageProducts";

const App = () => {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  const isAdmin = authUser?.role === "admin";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen bg-emerald-600 text-white flex items-center justify-center bg-bg-primary text-text-primary">
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
        <Route
          path="/admin-dashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />}
        />
        <Route
          path="/user-activity/:id"
          element={isAdmin ? <UserActivity /> : <Navigate to={"/"} />}
        />
        <Route
          path="/manage-products"
          element={isAdmin ? <ManageProducts /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
