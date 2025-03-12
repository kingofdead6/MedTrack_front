import { motion } from "framer-motion";
import doctor from "../../assets/doctor.svg";
import microscope from "../../assets/Microscope.svg"; 
import pharmacist from "../../assets/Pharmacist.svg";
import mentalHealth from "../../assets/MentalHealth.svg"; 

export default function HealthcareServices() {
  const services = [
    { name: "Doctors", icon: doctor, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "Labs", icon: microscope, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "Pharmacies", icon: pharmacist, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "Mental Health", icon: mentalHealth, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  ];

  // Animation variants for reusability
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeInOut" } },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut", delay: index * 0.2 },
    }),
    hover: {
      scale: 1.05,
      backgroundColor: "#0360D9",
      color: "#ffffff",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }, 
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="max-w-6xl pb-48 pt-48 mx-auto p-6"
    >
      {/* Title Animation */}
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="text-5xl font-bold text-gray-900 pb-6 mb-8 text-center"
      >
        Our Healthcare Services
      </motion.h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col p-6 border rounded-xl shadow-lg cursor-pointer bg-white group"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-[#E1EEFF] rounded-full mb-4 transition-colors duration-400 ease-in-out group-hover:bg-white">
              <img src={service.icon} alt={service.name} className="w-13 h-13" />
            </div>
            <h3 className="text-2xl font-bold mb-2 transition-colors duration-400 ease-in-out">{service.name}</h3>
            <p className="text-gray-600 transition-colors duration-400 ease-in-out group-hover:text-white">
              {service.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}