import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HealthcareDetails() {
  const [formData, setFormData] = useState({
    location_link: "",
    working_hours: "",
    can_deliver: false,
    certificate: "",
    speciality: "",
    pharmacy_name: "",
    clinic_name: "",
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const healthcareType = state.healthcareType;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/healthcare/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...formData, healthcare_type: healthcareType }),
    });
    if (response.ok) {
      navigate("/main");
    } else {
      alert("Failed to submit details");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{healthcareType} Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="location_link" placeholder="Location Link" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="working_hours" placeholder="Working Hours" onChange={handleChange} className="w-full p-2 border rounded" required />
          <label>
            <input name="can_deliver" type="checkbox" checked={formData.can_deliver} onChange={handleChange} />
            Can Deliver
          </label>
          <input name="certificate" placeholder="Certificate" onChange={handleChange} className="w-full p-2 border rounded" required />
          {healthcareType === "doctor" && (
            <select name="speciality" onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select Speciality</option>
              {["General Practitioner", "Dentist", "Surgeon", "Radiologist", "Pediatrician"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
          {healthcareType === "pharmacist" && (
            <input name="pharmacy_name" placeholder="Pharmacy Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          )}
          {healthcareType === "clinic" && (
            <input name="clinic_name" placeholder="Clinic Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          )}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
}