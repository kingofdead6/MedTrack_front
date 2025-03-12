import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import healthcare from "../../assets/doctor-logo-vector-silhouette-doctor-icon-white-background_1199258-61-removebg-preview 1.svg";

export default function HealthcareFinalStep() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation(); 
  const navigate = useNavigate();

  const formData = state?.formData || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === "certificate" && value instanceof File) {
        payload.append(key, value, value.name);
      } else {
        payload.append(key, value); 
      }
    }

    console.log("Final payload to backend:", Object.fromEntries(payload)); 

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        body: payload, 
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/main");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error: Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mx-12 mt-16">
      <div className="w-full max-w-5xl pt-6 pb-6 flex flex-col md:flex-row">
        {/* Left Section (Decorative) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-200 p-6 rounded-r-4xl rounded-l-4xl mr-6">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl font-bold pt-10 text-black mb-4">
              Complete <span className="text-blue-800">Registration</span>
            </h2>
            <img src={healthcare} alt="Healthcare" className="w-3/4 pt-10" />
          </div>
        </div>

        {/* Right Section (Confirmation) */}
        <div className="w-full md:w-1/2 p-6 shadow-2xl rounded-r-4xl rounded-l-4xl bg-white">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
            Confirm Your Details
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-2xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {Object.entries(formData).map(([key, value]) => (
              key !== "certificate" && key !== "password" && key !== "confirmPassword" ? (
                <p key={key}>
                  <strong>{formatLabel(key)}:</strong> {value.toString()}
                </p>
              ) : null
            ))}
            {formData.certificate && (
              <div>
                <p><strong>Certificate:</strong></p>
                <img
                  src={URL.createObjectURL(formData.certificate)}
                  alt="Certificate"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <button
              type="submit"
              className={`w-2/4 mx-auto block text-white p-3 rounded-2xl shadow-md font-semibold transition duration-300 hover:shadow-lg ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}