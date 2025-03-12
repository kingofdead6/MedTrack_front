import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doctorImg from "../../assets/doctor.svg";
import nurseImg from "../../assets/Nurse.svg";
import laboratoryImg from "../../assets/Laboratory.svg";
import pharmacyImg from "../../assets/Pharmacist.svg";
import { FaUpload } from "react-icons/fa";

export default function HealthcareDetails() {
  const [formData, setFormData] = useState({
    location_link: "",
    working_hours: "",
    can_deliver: false,
    certificate: null,
  });
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const healthcareType = state?.formData?.healthcare_type;

  const initialTypeSpecificData = {
    doctor: { speciality: "", clinic_name: "" },
    nurse: { ward: "", clinic_name: "" },
    laboratory: { lab_name: "", equipment: "", clinic_name: "" },
    pharmacy: { pharmacy_name: "" },
  };

  const [typeSpecificData, setTypeSpecificData] = useState(initialTypeSpecificData[healthcareType] || {});

  const typeImages = {
    doctor: doctorImg,
    nurse: nurseImg,
    laboratory: laboratoryImg,
    pharmacy: pharmacyImg,
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "certificate") {
      const file = files[0];
      setFormData({ ...formData, certificate: file });
      setCertificatePreview(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (["speciality", "ward", "lab_name", "equipment", "pharmacy_name", "clinic_name"].includes(name)) {
      setTypeSpecificData({ ...typeSpecificData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const requiredFields = {
      doctor: ["location_link", "working_hours", "speciality", "certificate"],
      nurse: ["location_link", "working_hours", "certificate"],
      laboratory: ["location_link", "working_hours", "lab_name", "certificate"],
      pharmacy: ["location_link", "working_hours", "pharmacy_name", "certificate"],
    };

    const isComplete =
      requiredFields[healthcareType].every((field) =>
        field === "certificate" ? formData[field] : formData[field]?.toString().trim() !== ""
      ) &&
      Object.keys(typeSpecificData)
        .filter((key) => requiredFields[healthcareType].includes(key))
        .every((key) => typeSpecificData[key].toString().trim() !== "");

    if (!isComplete) {
      setError("Please fill in all required fields");
      return;
    }

    const updatedFormData = {
      ...state.formData,
      ...formData,
      ...typeSpecificData,
    };

    navigate("/register/HealthcareFinalStep", { state: { formData: updatedFormData } });
  };

  const isFormComplete =
    formData.location_link.trim() !== "" &&
    formData.working_hours.trim() !== "" &&
    formData.certificate !== null &&
    (healthcareType !== "doctor" || typeSpecificData.speciality.trim() !== "") &&
    (healthcareType !== "laboratory" || typeSpecificData.lab_name.trim() !== "") &&
    (healthcareType !== "pharmacy" || typeSpecificData.pharmacy_name.trim() !== "");

  const workingHoursOptions = ["8 AM - 4 PM", "9 AM - 5 PM", "10 AM - 6 PM", "24/7"];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mx-12 mt-16">
      <div className="w-full max-w-5xl pt-6 pb-6 flex flex-col md:flex-row">
        {/* Left Section (Decorative) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-200 p-6 rounded-r-4xl rounded-l-4xl mr-6">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl font-bold pt-10 text-black mb-4">
              Register as a :{" "}
              <span className="text-blue-800">
                {healthcareType.charAt(0).toUpperCase() + healthcareType.slice(1).toLowerCase()}
              </span>
            </h2>
            <img src={typeImages[healthcareType]} alt={healthcareType} className="w-3/4 pt-10" />
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-6 shadow-2xl rounded-r-4xl rounded-l-4xl bg-white">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
            {healthcareType.charAt(0).toUpperCase() + healthcareType.slice(1).toLowerCase()} Details
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-6 rounded-2xl text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Common Fields */}
            <div>
              <label className="block p-2 text-gray-500">Location Link:</label>
              <input
                name="location_link"
                placeholder="Enter location link"
                value={formData.location_link}
                onChange={handleChange}
                className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block p-2 text-gray-500">Working Hours:</label>
              <select
                name="working_hours"
                value={formData.working_hours}
                onChange={handleChange}
                className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">Select Working Hours</option>
                {workingHoursOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Styled Can Deliver Toggle */}
            <div className="flex items-center justify-between p-2">
              <label className="text-gray-500 font-medium">Can Deliver:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  name="can_deliver"
                  type="checkbox"
                  checked={formData.can_deliver}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                    formData.can_deliver ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      formData.can_deliver ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </label>
            </div>

            {/* Certificate Upload with Icon */}
            <div>
              <label className="block p-2 text-gray-500">Certificate (Upload Image):</label>
              <div className="relative">
                <input
                  name="certificate"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-3 pr-10 border rounded-2xl text-gray-500 file:hidden"
                  required
                />
                <FaUpload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
              </div>
              {certificatePreview && (
                <img
                  src={certificatePreview}
                  alt="Certificate Preview"
                  className="mt-2 w-32 h-32 object-cover rounded shadow-md"
                />
              )}
            </div>

            {/* Type-Specific Fields */}
            {healthcareType === "doctor" && (
              <>
                <div>
                  <label className="block p-2 text-gray-500">Speciality:</label>
                  <select
                    name="speciality"
                    value={typeSpecificData.speciality}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  >
                    <option value="">Select Speciality</option>
                    {["General Practitioner", "Dentist", "Surgeon", "Radiologist", "Pediatrician"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block p-2 text-gray-500">Clinic Name (Optional):</label>
                  <input
                    name="clinic_name"
                    placeholder="Enter clinic name"
                    value={typeSpecificData.clinic_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </>
            )}

            {healthcareType === "nurse" && (
              <>
                <div>
                  <label className="block p-2 text-gray-500">Ward/Department (Optional):</label>
                  <input
                    name="ward"
                    placeholder="e.g., ICU, Pediatrics"
                    value={typeSpecificData.ward}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block p-2 text-gray-500">Clinic Name (Optional):</label>
                  <input
                    name="clinic_name"
                    placeholder="Enter clinic name"
                    value={typeSpecificData.clinic_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </>
            )}

            {healthcareType === "laboratory" && (
              <>
                <div>
                  <label className="block p-2 text-gray-500">Lab Name:</label>
                  <input
                    name="lab_name"
                    placeholder="Enter laboratory name"
                    value={typeSpecificData.lab_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block p-2 text-gray-500">Key Equipment (Optional):</label>
                  <input
                    name="equipment"
                    placeholder="e.g., X-ray, MRI"
                    value={typeSpecificData.equipment}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block p-2 text-gray-500">Clinic Name (Optional):</label>
                  <input
                    name="clinic_name"
                    placeholder="Enter clinic name"
                    value={typeSpecificData.clinic_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </>
            )}

            {healthcareType === "pharmacy" && (
              <>
                <div>
                  <label className="block p-2 text-gray-500">Pharmacy Name:</label>
                  <input
                    name="pharmacy_name"
                    placeholder="Enter pharmacy name"
                    value={typeSpecificData.pharmacy_name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className={`w-2/4 mx-auto block text-white p-3 rounded-2xl shadow-md font-semibold transition duration-300 hover:shadow-lg ${
                isFormComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormComplete}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}