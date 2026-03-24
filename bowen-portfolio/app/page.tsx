/**
 * File: page.tsx
 * Project: Bowen Groff Dev Team Submission
 * Author: Bowen Groff
 * Date: September 14, 2025
 * Description: This file contains setting up the desktop, the taskbar, the icons, and handling the window
 *              component array. 
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import Window from "./_components/window";

import "./globals.css";

import resume from "./assets/bowen-groff-resume.png";
import computerIcon from "./assets/computer.ico";
import crunch from "./assets/crunchcat.gif";
import github from "./assets/github.ico";
import linkedin from "./assets/linkedin.ico";
import photo from "./assets/me.jpg";
import recycleIcon from "./assets/recycle.ico";
import startButtonIcon from "./assets/start-button.png";
import textFileIcon from "./assets/textfile.ico";

interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  startX?: number;
  startY?: number;
}

const Clock = () => {
  const [date, setDate] = useState<Date | null>(null);
  
  useEffect(() => {
    // Initialize and set up interval
    const tick = () => setDate(new Date());
    tick(); // Call immediately
    const timerID = setInterval(tick, 1000);
    return () => clearInterval(timerID);
  }, []);

  const timeString = useMemo(() => {
    if (!date) return "--:--";
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleTimeString("en-GB", options);
  }, [date]);

  return <span>{timeString}</span>
};

function Page() {
  // Tabs for windows in taskbar
  const [windows, setWindows] = useState<AppWindow[]>([
    { id: "welcome", title: "Hello World", isOpen: true, startX: 0, startY: 0 },
    { id: "resume", title: "Resume.txt", isOpen: false, startX: 0, startY: 0 },
  ]);

  // Initialize random positions after mount
  useEffect(() => {
    setWindows((prev) =>
      prev.map((w) => ({
        ...w,
        startX: 20 + Math.random() * 100,
        startY: 50 + Math.random() * 50,
      })),
    );
  }, []);

  // Open or close a window
  const toggleWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: !w.isOpen } : w)),
    );
  };

  return (
    <>
    <div style={{ display: "flex", height: "100vh", width: "100vw", flexWrap: "wrap", alignContent: "flex-start", gap: "2rem", backgroundColor: "#008080", padding: "1rem" }}>
        <div className="icon-column">
          <button className="icon">
            <Image src={computerIcon} alt="Computer Icon"></Image>
            My Computer
          </button>
          <button className="icon">
            <Image src={recycleIcon} alt="Recycle Bin Icon"></Image>
            Recycle Bin
          </button>
          <button className="icon" onClick={() => toggleWindow("resume")}>
            <Image src={textFileIcon} alt="Text file icon"></Image>
            Resume.txt
          </button>
          <button
            className="icon"
            onClick={() => window.open("https://github.com/groffbo", "_blank")}
          >
            <Image src={github} alt="Puzzle pieces icon"></Image>
            GitHub
          </button>
          <button
            className="icon"
            onClick={() =>
              window.open("https://www.linkedin.com/in/bowengroff/", "_blank")
            }
          >
            <Image src={linkedin} alt="3 connected computers icon"></Image>
            Linkedin
          </button>
        </div>

        <div className="convex taskbar">
          <button className="icon">
            <Image
              className="startbutton"
              src={startButtonIcon}
              alt="Windows start button"
            ></Image>
          </button>
          <div className="spacer">
            {windows.map((w) => (
              <button
                key={w.id}
                className="convex tab"
                onClick={() => toggleWindow(w.id)}
              >
                {w.title}
              </button>
            ))}
          </div>
          <div className="concave clock">{Clock()}</div>
        </div>
      </div>
      {windows.map((w) =>
        w.isOpen ? (
          <Window
            key={w.id}
            title={w.title}
            startX={w.startX}
            startY={w.startY}
            onClose={() => toggleWindow(w.id)}
          >
            {w.id === "welcome" ? (
              <>
                <div className="flex gap-4">
                  <Image
                    className="convex image"
                    width={250}
                    height={250}
                    src={photo}
                    alt="Photo of person"
                  />
                  <span className="text mt-8">
                    My name is Bowen Groff. This is my second year at UCF. I am
                    a Computer Engineering student with an interest in anything
                    tech. I have worked on...
                    <ul className="list-disc pl-6">
                      <li>Kernel Module/Driver Development</li>
                      <li>Full Stack web dev w/ ReactJS</li>
                      <li>AI/ML with Python using Pytorch and Tensorflow</li>
                      <li>...Plenty more with more to come!</li>
                    </ul>
                    <Image
                      className="h-12"
                      src={crunch}
                      width={50}
                      height={50}
                      alt="Crunch cat gif"
                    ></Image>
                    <div className="absolute bottom-0 left-0 ml-5">
                      Try double clicking stuff! And feel free to close this
                      window :-) (you can reopen with taskbar)
                    </div>
                  </span>
                </div>
              </>
            ) : w.id === "resume" ? (
              <Image src={resume} alt="Resume"></Image>
            ) : (
              <p></p>
            )}
          </Window>
        ) : null,
      )}
    </>
  );
}

export default Page;