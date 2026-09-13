"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import Window from "./window";
import TimelineWindow, { positions } from "./TimelineWindow";
import Position from "./Position";

import computerIcon from "../assets/computer.ico";
import github from "../assets/github.ico";
import linkedin from "../assets/linkedin.ico";
import photo from "../assets/me.jpg";
import recycleIcon from "../assets/recycle.ico";
import startButtonIcon from "../assets/start-button.png";
import textFileIcon from "../assets/textfile.ico";
import skills from "../assets/w95_35.ico"

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

export default function ClassicDesktop() {
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
      ...(isMobile
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
    <div style={{ fontFamily: 'var(--font-windows95), Tahoma, sans-serif' }}>
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
          </div>

          <div className="convex taskbar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
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
                </>
              ) : w.id === "welcome-mobile" ? (
                <div style={{ padding: "8px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
                  <h1 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "8px" }}></h1>
                  <p style={{marginBottom: "10px"}}>Take a look around!</p>
                  <button className="convex" onClick={() => toggleWindow("welcome-mobile")} style={{width: "50px", padding: "5px"}}>Ok</button>
                </div>
              
              ) : w.id === "timeline" ? (
                <TimelineWindow />
              ) : (
                <p></p>
              )}
            </Window>
          ) : null,
        )}
    </div>
  );
}
