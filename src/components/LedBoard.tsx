import { useEffect, useRef, useState } from "react";

function LedBoard() {

  return (
    <div
      className="flex items-center justify-center w-[60vw] h-[80vh] border-white/50 border rounded-2xl relative"
    >
      <span className="flex items-center justify-center p-4 bg-[#202020] rounded-2xl text-white absolute bottom-4">
      </span>
    </div>
  );
}

export default LedBoard;
