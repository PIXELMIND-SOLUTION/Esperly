import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <img
        src="/search.png"   // 👉 put pencil image in public folder
        alt="cursor"
        className="w-8 h-8 rotate-45"
      />
    </div>
  );
};

export default CustomCursor;