import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import line from "../../assets/LogoLine.svg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; 

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          setError(data.message || "Failed to fetch user data");
          localStorage.removeItem("token");
        }
      } catch {
        setError("Network error: Could not reach the server");
        localStorage.removeItem("token");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-4 bg-[#bbd2f8] fixed top-0 z-50 shadow-md">
      {/* Logo (Left) */}
      <a href="/" className="flex items-center">
        <div className="relative inline-block">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Med<span className="text-blue-600">Track</span>
          </h1>
          <img
            src={line}
            alt="underline"
            className="w-full h-auto absolute left-0"
            style={{ bottom: "-10px" }}
          />
        </div>
      </a>

      {/* User Name (Middle) */}
      {user && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Welcome, <span className="text-blue-600">{user.name}</span>
          </h2>
        </div>
      )}

      {/* Auth Buttons or Logout (Right) */}
      <div className="flex items-center space-x-3 sm:space-x-4 font-bold">
        {user ? (
          <button
            onClick={handleLogout}
            className="border-2 border-blue-600 text-blue-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
          >
            Logout
          </button>
        ) : (
          <>
            <a
              href="/login"
              className="border-2 border-blue-600 text-blue-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
              aria-label="Log in to your account"
            >
              Log in
            </a>
            <a
              href="/register"
              className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-900 transition duration-300 ease-in-out"
              aria-label="Sign up for a new account"
            >
              Sign up
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;