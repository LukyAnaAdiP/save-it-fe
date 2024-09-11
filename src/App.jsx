import "./index.css";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./constant/LoadingAnimation";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      checkAuthentication();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/" && location.pathname !== "/features" && location.pathname !== "/aboutus" && location.pathname !== "/help") {
        navigate("/signin");
      }
    }
  }, [isLoading, isAuthenticated, navigate, location]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Navbar />
    <div className="max-w-screen-2xl mx-auto">
      <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;