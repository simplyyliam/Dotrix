import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
}

function LedBoard() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement[]>([]);

  const [dimension] = useState({
    w: 100,
    h: 40,
  });

  const boardWidth = innerWidth;
  const boardHeight = innerHeight;
  const dotSpacing = 20;

  const cols = Math.floor(boardWidth / dotSpacing);
  const rows = Math.floor(boardHeight / dotSpacing);

  const dots: Dot[] = Array.from({ length: cols * rows }, (_, i) => ({
    x: (i % cols) * dotSpacing,
    y: Math.floor(i / cols) * dotSpacing,
  }));

  // Setup breathing animation
  useEffect(() => {
    dotRef.current.forEach((dotEl, i) => {
      if (!dotEl) return;

      // const r = Math.random() * 256
      // const g = Math.random() * 256
      // const b = Math.random() * 256
      // Create infinite "breathing" animation
      gsap.to(dotEl, {
        scale: 0.5,
        duration: 1 + Math.random(),
        // backgroundColor: `rgba(${r}, ${g}, ${b}, 1)`,
        backgroundColor: "rgba(255, 255, 255)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [dots]);

  return (
    <div
      ref={boardRef}
      className={`relative h-[400px] rounded-2xl overflow-hidden`}
      style={{
        width: dimension.w + "vw",
        height: dimension.h + "vh",
      }}
    >
      {dots.map((dot, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotRef.current[i] = el;
          }}
          style={{
            left: dot.x + "px",
            top: dot.y + "px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            position: "absolute",
            // backgroundColor: "rgba(255,255,255,1)",
            transformOrigin: "center center",
          }}
        ></div>
      ))}
    </div>
  );
}

export default LedBoard;
