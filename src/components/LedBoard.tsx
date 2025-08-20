import { useEffect, useRef, useState } from "react";

function LedBoard() {
  const [mousePos, setMousePos] = useState<string | number>();
  const boardRef = useRef<HTMLDivElement | null>(null);

  const [center, setCenter] = useState(100);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const caster = document.createElement("div");
    caster.style.display = "block";
    caster.style.padding = "20px";
    caster.style.width = center + "px";
    caster.style.height = center + "px";
    caster.style.border = "1px solid #ffffff";
    caster.style.borderRadius = "50%";
    caster.style.position = "absolute";
    caster.style.pointerEvents = "none";

    board.appendChild(caster);
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const rec = board.getBoundingClientRect();
      const x = e.clientX - rec.left;
      const y = e.clientY - rec.top;
      setMousePos(`${x} : ${y}`);
      caster.style.left = x - center / 2 + "px";
      caster.style.top = y - center / 2 + "px";
    };

    board.addEventListener("mousemove", handleMouseMove);
    return () => {
      board.removeEventListener("mousemove", handleMouseMove);
      board?.removeChild(caster);
    };
  }, []);

  return (
    <div
      ref={boardRef}
      className="flex items-center justify-center w-[60vw] h-[80vh] border-white/50 border rounded-2xl relative"
    >
      {/* <span className="flex items-center justify-center p-4 bg-[#202020] rounded-2xl text-white absolute bottom-4">
        {mousePos}
      </span> */}
    </div>
  );
}

export default LedBoard;
