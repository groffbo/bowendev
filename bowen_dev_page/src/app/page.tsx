"use client";
import { useState } from "react";
import Home from "../app/components/Home";
import About from "../app/components/About";
import Career from "../app/components/Career";
import Projects from "../app/components/Projects";

type Page = "home" | "about" | "career" | "projects";

export default function PageApp() {
  const [page, setPage] = useState<Page>("home");

  const navItems: { label: string; value: Page }[] = [
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Career", value: "career" },
    { label: "Projects", value: "projects" },
  ];

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-900 text-white">
      <nav className="mb-6 flex space-x-4">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setPage(item.value)}
            className={`px-4 py-2 rounded font-semibold ${
              page === item.value
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="mt-4 w-full max-w-3xl">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "career" && <Career />}
        {page === "projects" && <Projects />}
      </main>
    </div>
  );
}
