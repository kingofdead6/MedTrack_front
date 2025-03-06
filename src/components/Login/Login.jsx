import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password, // Send plain password, backend will hash it
          user_type: userType, // Include user type from the first page
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        // Store token in localStorage or context for authenticated routes
        localStorage.setItem("token", data.token);
        // Redirect based on user type
        navigate(userType === "patient" ? "/patient-dashboard" : "/healthcare-dashboard");
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex w-3/5">
        <div className="w-2/5 bg-blue-200 p-8 rounded-l-2xl flex flex-col justify-center">
          <h2 className="text-2xl font-bold">
            Register as a {userType || "user"}
          </h2>
          <img src="/register-image.png" alt="Register" className="mt-4" />
        </div>
        <div className="w-3/5 p-8 text-black">
          <h2 className="text-xl font-semibold mb-4">Welcome to</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;