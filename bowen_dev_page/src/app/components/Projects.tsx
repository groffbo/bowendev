"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Pirateships",
    bullets: [
      "Collaborated with a team of 3 to create a Battleships inspired game with working multiplayer using Google Cloud.",
      "Built using Python with PyGame to create a grid, allow for ship placement, and update each user’s game per turn."
    ],
    link: null
  },
  {
    title: "SightSpeech",
    bullets: [
      "Developed an accessibility tool that brings text-to-speech capability into the physical world with React and Flask.",
      "Utilized Gemini API for contextual word grouping and text recognition clean-up after analyzing text with EasyOCR.",
      "Implemented gesture-oriented control of SightSpeech with MediaPipe JS for initiating capture of text and navigating the text by sentence using hand gestures."
    ],
    link: "https://github.com/groffbo/sight-to-speech"
  }
];

const upcomingProjects = [
  {
    title: "Knight Hacks VIII",
    bullets: []
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
        <h1 className="text-4xl font-bold text-center text-white mb-4 text-gradient z-10">
          Projects
        </h1>
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 w-full"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
              {proj.title}
            </h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {proj.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            {/* 👇 show button only if this project has a link */}
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
              >
                View on GitHub
              </a>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-4 text-gradient z-10">
          Upcoming
        </h1>
        {upcomingProjects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-gray-700 rounded-xl shadow-lg p-6 w-full border-2 border-dashed border-gray-500"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
              {proj.title}
            </h2>
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
