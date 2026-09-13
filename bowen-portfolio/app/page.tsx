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
import TimelineWindow, { positions } from "./_components/TimelineWindow";
import Position from "./_components/Position";
import PaintWindow from "./_components/PaintWindow";
import paintIcon from "./assets/paint.png";

import "./globals.css";

import "./globals.css";
import computerIcon from "./assets/computer.ico";
import crunch from "./assets/crunchcat.gif";
import raccoon from "./assets/raccoon.gif"
import github from "./assets/github.ico";
import linkedin from "./assets/linkedin.ico";
import photo from "./assets/me.jpg";
import recycleIcon from "./assets/recycle.ico";
import startButtonIcon from "./assets/start-button.png";
import textFileIcon from "./assets/textfile.ico";
import elephant from "./assets/200.gif";
import bear from "./assets/bear.gif"
import skills from "./assets/w95_35.ico"

interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  startX?: number;
  startY?: number;
  width?: number;
  height?: number;
  center?: boolean;
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
  const [isMobile, setIsMobile] = useState(false);
  const [windows, setWindows] = useState<AppWindow[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setWindows(
        [
          mobile ?
          { id: "welcome-mobile", title: "Hello World, I'm Bowen!", isOpen: true, width:200, height:120, center: true } : 
          { id: "welcome", title: "Hello World", isOpen: true, startX: 350, startY: 150, width: 600, height: 250}
        ]
      )
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addWindow = (id: string, customTitle?: string) => {
    const existingWindow = windows.find((w) => w.id === id);
    if (existingWindow) {
      if (!existingWindow.isOpen) {
        toggleWindow(id);
      }
      return;
    }

    const isMobile = window.innerWidth < 768;
    const newWindow: AppWindow = {
      id,
      title: customTitle || "Experience",
      isOpen: true,
      ...(id === "paint" ? { width: 800, height: 760, center: true } : isMobile
        ? { width: 350, height: 500, center: true }
        : { startX: 400, startY: 200, width: 800, height: 600 }),
    };

    setWindows((prev) => [...prev, newWindow]);
  };

  // Open or close a window
  const toggleWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: !w.isOpen } : w)),
    );
  };

  return (
    <>
    <div style={{ display: "flex", width: "100vw", flexWrap: "wrap", alignContent: "flex-start", gap: "2rem", backgroundColor: "#008080", padding: "1rem" }}>
        <div className="icon-column">
          <button className="icon">
            <Image src={computerIcon} alt="Computer Icon"></Image>
            My Computer
          </button>
          <button className="icon">
            <Image src={recycleIcon} alt="Recycle Bin Icon"></Image>
            Recycle Bin
          </button>
          <button className="icon" onClick={() => window.open('/bowen-groff-resume.pdf', '_blank')}>
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

          <button
            className="icon"
            onClick={() => addWindow("timeline")}
          >
            <Image src={skills} alt="Skills icon"></Image>
            Experience
          </button>
          <button className="icon" onClick={() => addWindow("paint", "Paint")}>
            <Image src={paintIcon} alt="" loading="eager" style={{ width: '64px', maxWidth: '100%', height: 'auto', imageRendering: 'pixelated' }} />
            Paint
          </button>
        </div>

        <div className="convex taskbar">
          <button className="icon">
            <Image
              className="startbutton"
              src={startButtonIcon}
              style={{ width: 'auto' }}
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
            className={w.id === 'welcome-mobile' ? 'mobile-welcome-window' : undefined}
            key={w.id}
            title={w.title}
            startX={w.startX}
            startY={w.startY}
            width={w.width}
            height={w.height}
            onClose={() => toggleWindow(w.id)}
            center={w.center}
          >
            {w.id === "welcome" ? (
              <>
                <div style={{ height: "100%", padding: "8px", display: "flex", flexDirection: "row", gap: "8px", alignItems: "flex-start" }}>
                  <Image
                    className="convex image"
                    width={250}
                    height={250}
                    src={photo}
                    style={{ objectFit: 'contain', height: 'auto' }}
                    alt="Photo of person"
                  />
                  <span className="text" style={{ flex: 1, marginTop: 0 }}>
                    Hello world, I'm
                  <pre>
                  {`██████╗  ██████╗ ██╗    ██╗███████╗███╗   ██╗██╗
██╔══██╗██╔═══██╗██║    ██║██╔════╝████╗  ██║██║
██████╔╝██║   ██║██║ █╗ ██║█████╗  ██╔██╗ ██║██║
██╔══██╗██║   ██║██║███╗██║██╔══╝  ██║╚██╗██║╚═╝
██████╔╝╚██████╔╝╚███╔███╔╝███████╗██║ ╚████║██╗
╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝╚═╝`}
                  </pre>
                    <div>
                      Take a look around and explore!
                      </div>                       
                    
                  </span>
                </div>
                                {/* <Image
                  className="h-12"
                  src={bear}
                  width={200}
                  height={92}
                  alt="bear peeking up">
                </Image> */}
              </>
            ) : w.id === "welcome-mobile" ? (
              <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", color: '#000' }}>
                <Image src={photo} alt="Bowen Groff" loading="eager" style={{ width: '112px', height: '112px', objectFit: 'cover', flexShrink: 0, border: '2px inset #fff' }} />
                <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>Welcome to My Desktop!</h1>
                <p style={{ fontSize: '1rem', lineHeight: 1.5, margin: 0 }}>I’m Bowen — previously at AMD, studying Computer Engineering at UCF, and researching in UCF’s iCAT lab.</p>
                <button className="convex" onClick={() => toggleWindow("welcome-mobile")} style={{ padding: "8px 20px", fontSize: '1rem' }}>Explore</button>
              </div>
            
            ) : w.id === "timeline" ? (
              <TimelineWindow />
            ) : w.id === "paint" ? (
              <PaintWindow />
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
