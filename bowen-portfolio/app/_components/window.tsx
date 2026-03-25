/**
 * File: window.tsx
 * Project: Bowen Groff Dev Team Submission
 * Author: Bowen Groff
 * Date: September 14, 2025
 * Description: Custom component for rendering a window to the screen. Includes handling for dragging
 *              the window by the navy header bar.
 */
import { useEffect, useRef, useState } from "react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  startX?: number;
  startY?: number;
  width?: number | string;
  height?: number | string;
  onClose?: () => void;
  center?: boolean;
}

export default function Window({
  title,
  children,
  startX = 100,
  startY = 100,
  width,
  height,
  onClose,
  center,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: startX, y: startY });
  const [dragging, setDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    if (center) return;
    setDrag(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  useEffect(() => {
    const duringDrag = (e: MouseEvent) => {
      if (!dragging || center) return;
      setPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const stopDrag = () => setDrag(false);

    if (dragging) {
      document.addEventListener("mousemove", duringDrag);
      document.addEventListener("mouseup", stopDrag);
    }

    return () => {
      document.removeEventListener("mousemove", duringDrag);
      document.removeEventListener("mouseup", stopDrag);
    };
  }, [dragging, offset, center]);

  const style: React.CSSProperties = {
    position: "absolute",
    width: width ? `${width}px` : "600px",
    height: height ? `${height}px` : "400px",
    maxWidth: "95vw",
    maxHeight: "90vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  };

  if (center) {
    style.left = "50%";
    style.top = "50%";
    style.transform = "translate(-50%, -50%)";
  } else {
    style.left = pos.x;
    style.top = pos.y;
  }

  return (
    <div
      ref={windowRef}
      className="convex window"
      style={style}
    >
      <div className="window-header" onMouseDown={startDrag}>
        <button onClick={onClose} className="convex window-header-button">
          X
        </button>
        <span>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}