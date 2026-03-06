import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-black w-screen h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
