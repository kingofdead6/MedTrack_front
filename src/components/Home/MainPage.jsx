import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Add error state for debugging
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token); // Log the token

      if (!token) {
        console.log("No token found, redirecting to /");
        navigate("/");
        return;
      }

      try {
        console.log("Fetching user data from backend...");
        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response status:", response.status); // Log status code
        const data = await response.json();
        console.log("Response data:", data); // Log full response

        if (response.ok) {
          if (data.user) {
            setUser(data.user); // Set user only if data.user exists
          } else {
            setError("No user data in response");
          }
        } else {
          setError(data.message || "Failed to fetch user data");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Network error: Could not reach the server");
      }
    };
    fetchUser();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
        {user.user_type === "healthcare" && !user.isApproved ? (
          <p>Awaiting admin approval...</p>
        ) : (
          <p>Start using the platform!</p>
        )}
      </div>
    </div>
  );
}