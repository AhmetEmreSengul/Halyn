import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import GoogleSuccess from "./pages/GoogleSuccess";

const App = () => {
  return (
    <div className="bg-black w-screen min-h-screen text-white">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />
      </Routes>
    </div>
  );
};

export default App;
