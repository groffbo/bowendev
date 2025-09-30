"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Pirateships",
    bullets: [
      "Collaborated with a team of 3 to create a Battleships inspired game with working multiplayer using Google Cloud.",
      "Built using Python with PyGame to create a grid, allow for ship placement, and update each user’s game per turn."
    ]
  }
];

const upcomingProjects = [
  {
    title: "ShellHacks 2025",
    bullets: [
    ]
  },
  {
    title: "Knight Hacks VIII",
    bullets: [
    ]
  }
];

export default function ProjectsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center space-y-10 p-6"
    >

      <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-4 text-gradient z-10">Projects</h1>
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 w-full"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{proj.title}</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {proj.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-4 text-gradient z-10">Upcoming</h1>
        {upcomingProjects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-gray-700 rounded-xl shadow-lg p-6 w-full border-2 border-dashed border-gray-500"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{proj.title}</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {proj.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

