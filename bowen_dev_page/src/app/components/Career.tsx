"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "L3Harris Technologies",
    date: "May 2025– October 2025",
    location: "Palm Bay, FL",
    bullets: [
      "Developed a Linux kernel driver in C that captured fibre channel frames from an FPGA and transmitted them on a UDP port, handling over 810 message buffers at a time.",
      "Mapped reserved memory blocks in custom device tree with C++ userspace application, allowing low-latency message handling between the FPGA and kernel.",
      "Verified message authenticity using Anonymous Subscriber Messaging protocol, which accepted 27 unique message labels and maintained circular queues for each individual label.",
      "Containerized application using Docker for deployment on target chassis, and integrated Jenkins CI/CD pipeline with SonarQube analysis and Valgrind testing to ensure code quality and reliability."
    ]
  },
  {
    title: "Software Engineer Intern",
    company: "L3Harris Technologies",
    date: "May 2024– April 2025",
    location: "Colorado Springs, CO",
    bullets: [
      "Upgraded legacy command line tool into a modern webpage for deep space telescope operators at GEODSS sites using ReactJS and SpringBoot, enabling efficient deployment and streamlined onboarding for telescope use.",
      "Optimized retrieval and conversion of .FITS files by developing reusable UI components, reducing file retrieval and conversion time by over 90%.",
      "Enhanced operator workflows by incorporating user-driven features, such as a message logger, user-friendly .ini file editor, and external program launcher.",
      "Delivered a continuously maintained and deployed system, increasing operational efficiency at GEODSS sites."
    ]
  },
  {
    title: "Software Engineer Intern",
    company: "L3Harris Technologies",
    date: "May 2023– August 2023",
    location: "Palm Bay, FL",
    bullets: [
      "Engineered a predictive analysis tool trained on a dataset of <1000 data points to predict failure modes in failing F-35 chipset modules.",
      "Trained one of three AI models used to obtain final output with a focus on word frequency to failure mode, which predicted failures correctly ∼68% of the time.",
      "Engineered a fully automated CI/CD pipeline with Jenkins to retrain the model nightly on a live SQL database used by test engineers to log failure modes, ensuring up-to-date performance and continuous model learning.",
      "Created and executed a presentation of PAT to F-35 hardware module operators and stakeholders on the F-35 contract, with ROI estimated at $5,000,000 due to failure mode diagnosis achieved ∼99.5% faster and thousands of hours saved overall."
    ]
  }
];

const extracurriculars = [
  {
    title: "IEEE Software Team Member",
    bullets: [
    ]
  },
  {
    title: "Knight Hacks Dev Team Member",
    bullets: [
    ]
  }
];

export default function CareerSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center space-y-10 p-6"
    >
      <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-4 text-gradient">Experience</h1>
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 w-full"
          >
            <h2 className="text-2xl font-semibold text-white mb-1">{exp.title}</h2>
            <p className="text-blue-400 font-medium mb-2">{exp.company}</p>
            <p className="text-gray-300 mb-1">{exp.date}</p>
            <p className="text-gray-300 mb-3">{exp.location}</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {exp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-4 text-gradient">Extracurriculars</h1>
        {extracurriculars.map((extra, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 w-full"
          >
            <h2 className="text-2xl font-semibold text-white mb-2 ">{extra.title}</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {extra.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
