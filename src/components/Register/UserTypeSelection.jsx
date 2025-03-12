import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorIcon from "../../assets/doctor.svg"; 
import patientIcon from "../../assets/patient.svg"; 

const roles = [
  { name: "Healthcare Staff", value: "healthcare", icon: doctorIcon },
  { name: "Patient", value: "patient", icon: patientIcon },
];

export default function UserTypeSelection() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleClick = (roleValue) => {
    setSelected(roleValue);
  };

  const handleConfirm = () => {
    if (selected === "patient") {
      navigate("/register/patient-register", { state: { userType: "patient" } });
    } else if (selected === "healthcare") {
      navigate("/register/healthcare-register", { state: { userType: "healthcare" } });
    }
  };

  return (
    <div className="bg-[#D3E3FC] min-h-screen flex flex-col items-center p-6 relative">
      {/* Heading */}
      <h2 className="text-4xl sm:text-7xl font-bold text-center mt-20">
        Welcome to <span className="text-blue-600">MedTrack</span>
      </h2>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-60 mt-12">
        {roles.map((role, index) => (
          <div key={index} className="flex flex-col pt-16 items-center">
            {/* Clickable Circle */}
            <div
              onClick={() => handleClick(role.value)}
              className={`w-64 sm:w-80 h-64 sm:h-80 bg-[#AFCBFA] rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform transform hover:scale-110 active:scale-95 ${
                selected === role.value ? "border-4 border-blue-600" : ""
              }`}
            >
              <img src={role.icon} alt={role.name} className="w-40 sm:w-52 h-40 sm:h-52" />
            </div>
            {/* Role Label */}
            <div
              onClick={() => handleClick(role.value)}
              className={`bg-blue-600 text-white text-xl sm:text-3xl z-10 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full -mt-6 sm:-mt-8 shadow-lg cursor-pointer transition-transform transform hover:scale-110 active:scale-95 ${
                selected === role.value ? "bg-blue-700" : ""
              }`}
            >
              {role.name.toLowerCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={!selected} // Disabled until a role is selected
        className={`mt-12 bg-blue-600 text-white text-lg sm:text-xl font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out ${
          selected ? "hover:bg-blue-700 cursor-pointer" : "opacity-50 cursor-not-allowed"
        }`}
      >
        Confirm
      </button>
    </div>
  );
}