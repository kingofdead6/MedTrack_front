import { motion } from "framer-motion";
import ellipse12 from "../../assets/Ellipse 12.png";
import ellipse11 from "../../assets/Ellipse 11.png";
import ellipse9 from "../../assets/Ellipse 9.png";
import ellipse10 from "../../assets/Ellipse 10.png";
import ellipse8 from "../../assets/Ellipse 8.png";

export default function HealthcareReviews() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  const leftSectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } },
  };

  const avatarContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeInOut", delay: 0.6 + index * 0.15 },
    }),
    hover: { scale: 1.2, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const reviewCardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } },
    hover: {
      scale: 1.03,
      backgroundColor: "#E1EEFF",
      borderColor: "transparent",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  // Review data
  const reviews = [
    {
      name: "Jane Cooper",
      date: "12/4/17",
      rating: "8.5",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus.",
      avatar: ellipse10,
    },
    {
      name: "John Doe",
      date: "15/6/18",
      rating: "9.0",
      text: "Excellent service, highly recommend! Lorem ipsum dolor sit amet.",
      avatar: ellipse9,
    },
    {
      name: "Alice Smith",
      date: "20/9/19",
      rating: "7.8",
      text: "Great experience, though it could be faster. Lorem ipsum.",
      avatar: ellipse11,
    },
    {
      name: "Bob Johnson",
      date: "10/1/20",
      rating: "8.9",
      text: "Very professional staff. Lorem ipsum dolor sit amet.",
      avatar: ellipse8,
    },
  ];

  // Variants for sliding reviews
  const reviewSliderVariants = {
    animate: {
      y: [0, -100, -200, -300, 0],
      transition: {
        y: { repeat: Infinity, duration: 12, ease: "linear" },
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="mb-60 max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
    >
      {/* Left Section */}
      <motion.div
        variants={leftSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-5xl mb-12 font-bold text-gray-900">
          <span className="text-[#0360D9]">Rate</span> our healthcare services
        </h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit
          viverra amet faucibus.
        </p>
        <div className="flex items-center">
          <motion.div
            variants={avatarContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex items-center space-x-0 mb-4"
          >
            {[ellipse12, ellipse11, ellipse9, ellipse10, ellipse8].map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt="User avatar"
                className="w-10 h-10 rounded-full border border-gray-300"
                custom={index}
                variants={avatarVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: false, amount: 0.2 }}
              />
            ))}
          </motion.div>
          <p className="font-semibold text-gray-900 pl-10 pt-2">
            100+ Reviews
          </p>
        </div>
      </motion.div>

      {/* Review Card with Sliding Reviews */}
      <motion.div
        variants={reviewCardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        className="p-6 border rounded-xl shadow-lg bg-white h-[300px] overflow-hidden relative" // Fixed height
      >
        <motion.div
          variants={reviewSliderVariants}
          animate="animate"
          className="absolute top-0 left-0 w-full"
        >
          {reviews.map((review, index) => (
            <div key={index} className="p-2 w-full h-[100px]"> {/* Adjust height */}
              <div className="flex items-center mb-2">
                <motion.img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border border-gray-300"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }}
                />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <motion.p
                  className="ml-auto text-lg font-semibold text-[#0360D9]"
                  whileHover={{ color: "#ffffff", transition: { duration: 0.4, ease: "easeInOut" } }}
                >
                  {review.rating}{" "}
                  <span className="text-black group-hover:text-white">/ 10</span>
                </motion.p>
              </div>
              <p className="text-sm text-gray-600 transition-colors duration-400 ease-in-out group-hover:text-gray-800">
                {review.text}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}