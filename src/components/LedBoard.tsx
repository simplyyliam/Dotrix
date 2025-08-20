import { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
}

function LedBoard() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [center] = useState(100); // caster size

  // Board dimensions
  const boardWidth = 800;
  const boardHeight = 600;
  const dotSpacing = 20;

  // Generate grid of dots
  const cols = Math.floor(boardWidth / dotSpacing);
  const rows = Math.floor(boardHeight / dotSpacing);

  const dots: Dot[] = Array.from({ length: cols * rows }, (_, i) => ({
    x: (i % cols) * dotSpacing,
    y: Math.floor(i / cols) * dotSpacing,
  }));

  // Caster that follows the mouse
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const caster = document.createElement("div");
    caster.style.position = "absolute";
    caster.style.width = center + "px";
    caster.style.height = center + "px";
    caster.style.borderRadius = "50%";
    caster.style.pointerEvents = "none";
    caster.style.backgroundColor = "rgba(255,255,255,0.2)";

    board.appendChild(caster);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = board.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      caster.style.left = x - center / 2 + "px";
      caster.style.top = y - center / 2 + "px";
    };

    board.addEventListener("mousemove", handleMouseMove);
    return () => {
      board.removeEventListener("mousemove", handleMouseMove);
      board.removeChild(caster);
    };
  }, [center]);

  return (
    <div
      ref={boardRef}
      className="relative w-[800px] h-[600px] rounded-2xl overflow-hidden bg-[#111]"
    >
      {dots.map((dot, i) => {
        let lightUp = false;
        if (mousePos) {
          const distance = Math.hypot(
            mousePos.x - dot.x,
            mousePos.y - dot.y
          );
          lightUp = distance < center / 2;
        }

        return (
          <div
            key={i}
            style={{
              left: dot.x + "px",
              top: dot.y + "px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              position: "absolute",
              backgroundColor: lightUp
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0.2)",
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default LedBoard;
