import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doctor from "../../assets/doctor.svg";
import nurse from "../../assets/Nurse.svg";
import laboratory from "../../assets/Laboratory.svg";
import pharmacy from "../../assets/Pharmacist.svg";

const roles = [
  { name: "Doctor", value: "doctor", icon: doctor },
  { name: "Nurse", value: "nurse", icon: nurse },
  { name: "Laboratory", value: "laboratory", icon: laboratory },
  { name: "Pharmacy", value: "pharmacy", icon: pharmacy },
];

const HealthcareTypeSelection = () => {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const { state } = useLocation(); // Get formData from HealthcareRegister
  const navigate = useNavigate();

  const handleClick = (roleValue) => {
    setSelected(roleValue);
    setError(null); 
  };

  const handleNext = () => {
    if (!selected) {
      setError("Please select a healthcare type");
      return;
    }

    // Combine previous formData with selected healthcareType
    const updatedFormData = {
      ...state.formData,
      healthcare_type: selected,
    };

    // Pass to the next step without saving to the backend
    navigate("/register/healthcare-details", { state: { formData: updatedFormData } });
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-5xl font-bold text-center mt-20">
        Are <span className="text-blue-600">you</span> a :
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-2xl text-center max-w-4xl mx-auto mt-8">
          {error}
        </div>
      )}

      {/* Roles Grid - 2 Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 max-w-4xl mx-auto">
        {roles.map((role, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              onClick={() => handleClick(role.value)}
              className={`w-64 h-56 bg-blue-300 rounded-full flex items-center justify-center shadow-lg relative cursor-pointer transition-transform transform hover:scale-110 active:scale-95 ${
                selected === role.value ? "border-4 border-blue-600" : ""
              }`}
            >
              <img src={role.icon} alt={role.name} className="w-36 h-36" />
            </div>
            <div
              onClick={() => handleClick(role.value)}
              className={`bg-blue-600 text-white z-10 font-bold text-xl py-3 px-8 rounded-full -mt-8 shadow-lg cursor-pointer transition-transform transform hover:scale-110 active:scale-95 ${
                selected === role.value ? "bg-blue-700" : ""
              }`}
            >
              {role.name}
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!selected}
        className={`mt-12 mx-auto block bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out ${
          selected ? "hover:bg-blue-700 cursor-pointer" : "opacity-50 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default HealthcareTypeSelection;