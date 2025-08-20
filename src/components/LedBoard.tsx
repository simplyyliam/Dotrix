import gsap from "gsap";
import { useEffect, useRef} from "react";

interface Dot {
  x: number;
  y: number;
}

function LedBoard() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement[]>([]);

  const boardWidth = 800;
  const boardHeight = 600;
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

      // Create infinite "breathing" animation
      gsap.to(dotEl, {
        scale: 0.5,
        duration: 1 + Math.random(), // slight variation per dot
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [dots]);

  return (
    <div
      ref={boardRef}
      className="relative w-[800px] h-[600px] rounded-2xl overflow-hidden bg-[#111]"
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
            backgroundColor: "rgba(255,255,255,1)",
            transformOrigin: "center center",
          }}
        ></div>
      ))}
    </div>
  );
}

export default LedBoard;
