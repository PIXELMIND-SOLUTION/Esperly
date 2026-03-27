import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
  const cursorOuter = useRef(null);
  const cursorInner = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const outer = cursorOuter.current;
    const inner = cursorInner.current;
    if (!outer || !inner) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: mouse.x, y: mouse.y };

    let isStuck = false;
    let rafId;

    // 🔥 SMOOTH FOLLOW (LERP)
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      pos.x = lerp(pos.x, mouse.x, 0.15);
      pos.y = lerp(pos.y, mouse.y, 0.15);

      if (!isStuck) {
        outer.style.transform = `translate(${pos.x - 20}px, ${pos.y - 20}px)`;
      }

      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    /* =========================
       HOVER EFFECT
    ========================= */
    const handleEnter = (e) => {
      isStuck = true;
      const rect = e.currentTarget.getBoundingClientRect();

      outer.style.transition = "all 0.2s ease";
      outer.style.width = `${rect.width}px`;
      outer.style.height = `${rect.height}px`;
      outer.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
      outer.style.borderRadius = "10px";
      outer.style.backgroundColor = "rgba(166,25,46,0.12)";

      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(2)`;
    };

    const handleLeave = () => {
      isStuck = false;

      outer.style.transition = "all 0.2s ease";
      outer.style.width = "40px";
      outer.style.height = "40px";
      outer.style.borderRadius = "50%";
      outer.style.backgroundColor = "transparent";

      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(1)`;
    };

    /* =========================
       CLICK EFFECT
    ========================= */
    const handleDown = () => {
      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(1.6)`;
      outer.style.transform = `translate(${pos.x - 20}px, ${pos.y - 20}px) scale(0.85)`;
    };

    const handleUp = () => {
      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(1)`;

      if (!isStuck) {
        outer.style.transform = `translate(${pos.x - 20}px, ${pos.y - 20}px) scale(1)`;
      }
    };

    /* =========================
       TARGET ELEMENTS
    ========================= */
    const elements = document.querySelectorAll(
      "button, a, input, textarea, select, .cursor-pointer, .card"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });

      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, [location]);

  return (
    <>
      {/* OUTER CURSOR */}
      <div
        ref={cursorOuter}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#A6192E] rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: "transform",
          transition: "all 0.15s ease",
        }}
      />

      {/* INNER CURSOR */}
      <div
        ref={cursorInner}
        className="fixed top-0 left-0 w-3 h-3 bg-[#A6192E] rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: "transform",
          transition: "transform 0.1s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;