import Login from "../../components/Login/Login";
import HealthCare_Patient from "../../components/Register/HealthCare_Patient";
const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
        <HealthCare_Patient />
        <Login />
    </div>
  );
};

export default Home;
