import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HealthcareRegister() {
  const [formData, setFormData] = useState({ name: "", email: "", phone_number: "", password: "", confirmPassword: "" });
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, user_type: state.userType }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/healthcare-type", { state: { userId: data.user._id } });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Healthcare Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="phone_number" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Next</button>
        </form>
      </div>
    </div>
  );
}