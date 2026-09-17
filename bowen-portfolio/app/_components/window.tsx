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
  className?: string;
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
  className = "",
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
  const [hasMoved, setHasMoved] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    const bounds = windowRef.current?.getBoundingClientRect();
    if (!bounds) return;
    e.preventDefault();
    setPos({ x: bounds.left, y: bounds.top });
    setHasMoved(true);
    setDrag(true);
    setOffset({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  useEffect(() => {
    const duringDrag = (e: MouseEvent) => {
      if (!dragging) return;
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
  }, [dragging, offset]);

  const style: React.CSSProperties = {
    position: "absolute",
    width: width ? `${width}px` : "800px",
    height: height ? `${height}px` : "600px",
    maxWidth: "95vw",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  };

  if (center && !hasMoved) {
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
      className={`convex window ${className}`}
      style={style}
    >
      <div className="window-header" onMouseDown={startDrag}>
        <button onClick={onClose} className="convex window-header-button">
          X
        </button>
        <span>{title}</span>
      </div>
      <div style={{ height: 'calc(100% - 25px)', overflowY: 'auto', position: 'relative', zIndex: 0 }}>{children}</div>
    </div>
  );
}
