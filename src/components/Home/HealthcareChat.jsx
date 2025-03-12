import React from "react";
import { motion } from "framer-motion";
import ellipse8 from "../../assets/Ellipse 8.png";
import ellipse9 from "../../assets/Ellipse 9.png";
import ellipse10 from "../../assets/Ellipse 10.png";
import ellipse11 from "../../assets/Ellipse 11.png";
import ellipse12 from "../../assets/Ellipse 12.png";
import chatImage from "../../assets/m.png";
import vector8 from "../../assets/LogoLine.svg";

const HealthcareChat = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  const textSectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 } },
  };

  const avatarContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.4 } },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.5 + index * 0.15 },
    }),
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const imageSectionVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  };

  const medTrackVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 } },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 1, ease: "easeInOut", delay: 0.5 } },
    hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <div className="pt-28 pb-28">
      {/* Chat Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="bg-[#E1EEFF] max-w-6xl mx-auto p-12  flex flex-col md:flex-row items-center md:items-start justify-between rounded-[2rem] shadow-lg"
      >
        {/* Text Section */}
        <motion.div
          variants={textSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-5xl font-bold text-gray-900 pt-32">
            <span className="text-blue-600">Chat</span> with your Patients
          </h1>
          <p className="text-gray-600 mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus.
          </p>

          {/* User Images */}
          <motion.div
            variants={avatarContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center items-center space-x-2 mt-8"
          >
            {[ellipse8, ellipse10, ellipse11, ellipse9, ellipse12].map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`User ${index + 1}`}
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                custom={index}
                variants={avatarVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: false, amount: 0.3 }}
              />
            ))}
            <p className="font-semibold text-gray-900 pl-6">100+ Reviews</p>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={imageSectionVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.3 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={chatImage}
            alt="Chat Interface"
            className="w-2/3 rounded-[2.5rem] max-w-md shadow-md"
          />
        </motion.div>
      </motion.div>

      {/* MedTrack Section */}
      <motion.div
        variants={medTrackVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="pt-16 text-center"
      >
        <h1 className="text-6xl font-semibold font-['IBM Plex Sans'] text-gray-900">
          Choose{" "}
          <motion.span className="relative inline-block">
            Med<span className="text-blue-600">Track</span>
            <motion.img
              src={vector8}
              alt="underline"
              className="absolute left-0 w-full h-auto"
              style={{ bottom: "-15px" }}
              variants={underlineVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
            />
          </motion.span>
          , choose professionalism
        </h1>
      </motion.div>
    </div>
  );
};

export default HealthcareChat;