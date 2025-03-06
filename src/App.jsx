import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserTypeSelection from "./components/Register/UserTypeSelection";
import PatientRegister from "./components/Register/PatientRegister";
import HealthcareRegister from "./components/Register/HealthCareRegister";
import HealthcareTypeSelection from "./components/Register/HealthcareTypeSelection";
import HealthcareDetails from "./components/Register/HealthCareDetails";
import MainPage from "./components/Home/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/healthcare-register" element={<HealthcareRegister />} />
        <Route path="/healthcare-type" element={<HealthcareTypeSelection />} />
        <Route path="/healthcare-details" element={<HealthcareDetails />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;