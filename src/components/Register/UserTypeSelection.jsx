import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserTypeSelection() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (selected === "patient") {
      navigate("/patient-register", { state: { userType: "patient" } });
    } else if (selected === "healthcare") {
      navigate("/healthcare-register", { state: { userType: "healthcare" } });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Your Role</h2>
        <div className="space-y-4">
          <button
            className={`w-full p-4 border-2 rounded-lg text-lg font-semibold transition-all ${
              selected === "healthcare" ? "border-blue-500 bg-blue-100" : "border-gray-300"
            }`}
            onClick={() => setSelected("healthcare")}
          >
            Healthcare Provider
          </button>
          <button
            className={`w-full p-4 border-2 rounded-lg text-lg font-semibold transition-all ${
              selected === "patient" ? "border-blue-500 bg-blue-100" : "border-gray-300"
            }`}
            onClick={() => setSelected("patient")}
          >
            Patient
          </button>
        </div>
        {selected && (
          <button
            onClick={handleConfirm}
            className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg"
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
}