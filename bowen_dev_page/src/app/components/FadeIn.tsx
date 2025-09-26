import { motion } from "framer-motion";

export default function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800 text-white p-6 rounded mb-6"
    >
    </motion.div>
  );
}
