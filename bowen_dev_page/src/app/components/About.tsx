"use client";
import { motion } from "framer-motion";
import {
  FaPython,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaJava,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { SiCplusplus, SiTypescript, SiTailwindcss, SiPytorch, SiTensorflow, SiPandas, SiDocker, SiLinux, SiVirtualbox, SiVercel, SiNextdotjs, SiJenkins, SiAtlassian } from "react-icons/si";

export default function About() {
  const techStack = {
    Languages: [
      { name: "C", icon: null },
      { name: "C++", icon: <SiCplusplus size={24} /> },
      { name: "Java", icon: <FaJava size={24} /> },
      { name: "JavaScript", icon: <FaJsSquare size={24} /> },
      { name: "TypeScript", icon: <SiTypescript size={24} /> },
      { name: "Python", icon: <FaPython size={24} /> },
      { name: "HTML", icon: <FaHtml5 size={24} /> },
      { name: "CSS", icon: <FaCss3Alt size={24} /> },
    ],
    "Libraries/Frameworks": [
      { name: "React", icon: <FaReact size={24} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={24} /> },
      { name: "PyTorch", icon: <SiPytorch size={24} /> },
      { name: "TensorFlow", icon: <SiTensorflow size={24} /> },
      { name: "Pandas", icon: <SiPandas size={24} /> },
      { name: "Node.js", icon: <FaNodeJs size={24} /> },
      { name: "PyGame", icon: null },
      { name: "Next.js", icon: <SiNextdotjs size={24} /> },
      { name: "Vercel", icon: <SiVercel size={24} /> },
    ],
    "Developer Tools": [
      { name: "Git", icon: <FaGitAlt size={24} /> },
      { name: "Atlassian Suite", icon: <SiAtlassian size={24} /> },
      { name: "Jenkins", icon: <SiJenkins size={24} /> },
      { name: "Docker", icon: <SiDocker size={24} /> },
      { name: "Linux", icon: <SiLinux size={24} /> },
      { name: "VirtualBox", icon: <SiVirtualbox size={24} /> },
      { name: "vSphere", icon: null },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center space-y-10 p-6"
    >

      <h1 className="text-4xl font-bold text-center text-gradient">About Me</h1>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-lg w-full flex flex-col items-center">
        <p className="text-gray-300 text-center mb-4">
          Hi, my name is Bowen! :-D I am drawn to code for one main reason: the only limitation as to what can be done with technology is our own imagination.
        </p>

        <p className="text-gray-400 text-center">
          Outside of my technological interests, I enjoy camping and nature, creating art, and playing D&D.
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-lg w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Tech Stack</h2>
        <div className="flex flex-col gap-6 w-full">
          {Object.entries(techStack).map(([section, items]) => (
            <div key={section} className="flex flex-col items-center w-full">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">{section}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded transform transition duration-300 hover:scale-105 hover:bg-gray-600"
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span className="text-gray-200">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
