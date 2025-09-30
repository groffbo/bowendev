"use client";
import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center space-y-4 p-6"
    >
      <p className="text-xl text-gray-300 text-center">Hello World, I’m</p>

      <h1 className="text-4xl md:text-6xl font-bold text-center text-gradient">
        Bowen Groff
      </h1>

      <img
        src="/profile.jpg"
        alt="Profile"
        className="w-40 md:w-64 h-40 md:h-64 rounded-full object-cover mt-4"
      />

      <p className="text-gray-400 font-medium text-center mt-2">
        Computer Engineering Student
      </p>

      <p className="text-gray-400 font-medium text-center">
        University of Central Florida
      </p>
    </motion.div>
  );
}

