import { motion } from "framer-motion";
import surgery from "../../assets/surgery.svg"
export default function WhyChooseUs() {
  const points = [
    "You can rate our healthcare services",
    "You can book an appointment online",
    "You can chat with your doctor / nurse",
    "You can track your patient Medical Record",
    "You can ....."
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pt-32 pb-32 max-w-6xl mx-auto p-24 mb-48 bg-[#E1EEFF] rounded-4xl flex flex-col md:flex-row items-center gap-8"
    >
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full md:w-1/2"
      >
        <img
          src= {surgery}
          alt="Healthcare Service"
          className="w-full h-auto rounded-xl mr-2 shadow-lg"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="ml-10 w-full md:w-1/2"
      >
        <h2 className="text-4xl font-semibold text-gray-900 mb-8">
          Why You Choose Us?
        </h2>

        {/* List Items */}
        <ul className="space-y-3">
          {points.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="flex items-center text-lg text-gray-700 hover:text-[#0360D9] transition-all duration-300"
            >
              <span className="text-[#0360D9] mr-3">✅</span>
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0360D9] after:transition-all after:duration-300 hover:after:w-full">
                {point}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
