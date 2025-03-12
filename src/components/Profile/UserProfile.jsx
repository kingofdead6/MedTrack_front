import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [healthcareData, setHealthcareData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Set initial user data from login
      if (state?.user) {
        setUserData(state.user);
      }

      try {
        // Fetch current user data
        const userResponse = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();
        if (!userResponse.ok) throw new Error(userData.message);
        setUserData(userData.user);

        // Fetch healthcare details if user is healthcare
        if (userData.user.user_type === "healthcare") {
          const healthcareResponse = await fetch("http://localhost:5000/api/healthcare/details", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const healthcareData = await healthcareResponse.json();
          if (!healthcareResponse.ok) throw new Error(healthcareData.message);
          setHealthcareData(healthcareData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [state, navigate]);

  const formatLabel = (key) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-700">{error}</div>;
  if (!userData) return <div className="text-center mt-20">No user data available</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mx-12 mt-16">
      <div className="w-full max-w-2xl p-6 shadow-2xl rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Your Profile</h2>

        <div className="space-y-4">
          {/* Basic User Info */}
          <h3 className="text-lg font-medium text-gray-700">User Information</h3>
          {Object.entries(userData).map(([key, value]) =>
            key !== "hashed_password" && key !== "_id" ? (
              <p key={key}>
                <strong>{formatLabel(key)}:</strong> {value.toString()}
              </p>
            ) : null
          )}

          {/* Healthcare Info (if applicable) */}
          {healthcareData && (
            <>
              <h3 className="text-lg font-medium text-gray-700 mt-6">Healthcare Details</h3>
              {Object.entries(healthcareData).map(([key, value]) =>
                key !== "_id" && key !== "healthcare_id" && key !== "user_id" ? (
                  <p key={key}>
                    <strong>{formatLabel(key)}:</strong> {value.toString()}
                  </p>
                ) : null
              )}
              {healthcareData.certificate && (
                <div>
                  <p><strong>Certificate:</strong></p>
                  <img
                    src={`http://localhost:5000/${healthcareData.certificate}`}
                    alt="Certificate"
                    className="mt-2 w-48 h-48 object-cover rounded shadow-md"
                  />
                </div>
              )}
            </>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="w-full mt-6 text-white p-3 rounded-2xl bg-red-600 hover:bg-red-700 shadow-md font-semibold transition duration-300 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}