import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [pendingHealthCare, setPendingHealthCare] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingHealthCare = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/healthcare/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch pending requests");
        setPendingHealthCare(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingHealthCare();
  }, [navigate]);

  const handleApprove = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/admin/healthcare/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setPendingHealthCare(pendingHealthCare.filter((hc) => hc.user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatLabel = (key) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-700">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mx-12 mt-16">
      <div className="w-full max-w-5xl p-6 shadow-2xl rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Admin Dashboard</h2>

        {pendingHealthCare.length === 0 ? (
          <p className="text-center text-gray-600">No pending healthcare registrations.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-gray-700">Name</th>
                  <th className="p-3 text-gray-700">Email</th>
                  <th className="p-3 text-gray-700">Type</th>
                  <th className="p-3 text-gray-700">Details</th>
                  <th className="p-3 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingHealthCare.map((hc) => (
                  <tr key={hc.user._id} className="border-b">
                    <td className="p-3">{hc.user.name}</td>
                    <td className="p-3">{hc.user.email}</td>
                    <td className="p-3">
                      {hc.healthcare.healthcare_type.charAt(0).toUpperCase() +
                        hc.healthcare.healthcare_type.slice(1).toLowerCase()}
                    </td>
                    <td className="p-3">
                      {Object.entries(hc.healthcare)
                        .filter(
                          ([key]) =>
                            !["_id", "healthcare_id", "user_id", "__v"].includes(key) &&
                            key !== "healthcare_type" &&
                            key !== "certificate"
                        )
                        .map(([key, value]) => (
                          <p key={key}>
                            <strong>{formatLabel(key)}:</strong> {value.toString()}
                          </p>
                        ))}
                      {hc.healthcare.certificate && (
                        <div className="mt-2">
                          <p><strong>Certificate:</strong></p>
                          <img
                            src={`http://localhost:5000/${hc.healthcare.certificate}`}
                            alt="Certificate"
                            className="w-32 h-32 object-cover rounded shadow-md"
                            onError={(e) => (e.target.src = "https://via.placeholder.com/128?text=Image+Not+Found")}
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleApprove(hc.user._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition duration-300"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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