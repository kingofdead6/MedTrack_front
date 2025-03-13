import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegister from "./components/Register/PatientRegister";
import HealthcareRegister from "./components/Register/HealthCareRegister";
import HealthcareTypeSelection from "./components/Register/HealthcareTypeSelection";
import HealthcareDetails from "./components/Register/HealthCareDetails";
import HealthcareFinalStep from "./components/Register/HealthcareFinalStep";
import MainPage from "./components/Home/MainPage";
import Register from "./pages/Register/page";
import Login from "./pages/Login/page";
import Admin from "./pages/Admin/page";
import Home from "./pages/Home/page";
import Navbar from "./components/Shared/NavBar";
import UserProfile from "./components/Profile/UserProfile";
import Chatbot from "./components/ChatBot/ChatBot";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Register Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/register/patient-register" element={<PatientRegister />} />
        <Route path="/register/healthcare-register" element={<HealthcareRegister />} />
        <Route path="/register/HealthcareTypeSelection" element={<HealthcareTypeSelection />} />
        <Route path="/register/healthcare-details" element={<HealthcareDetails />} />
        <Route path="/register/HealthcareFinalStep" element={<HealthcareFinalStep />} />

        {/* Login Routes */}
        <Route path="/login" element={<Login />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<UserProfile />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin/>} />
        {/* Main Routes */}
        <Route path="/main" element={<MainPage />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;