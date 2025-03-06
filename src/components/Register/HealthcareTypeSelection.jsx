import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HealthcareTypeSelection() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) {
      navigate("/healthcare-details", { state: { healthcareType: selected } });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Healthcare Type</h2>
        <div className="space-y-4">
          {["doctor", "nurse", "pharmacist", "clinic"].map((type) => (
            <button
              key={type}
              className={`w-full p-4 border-2 rounded-lg text-lg font-semibold transition-all ${
                selected === type ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
              onClick={() => setSelected(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {selected && (
          <button
            onClick={handleNext}
            className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}