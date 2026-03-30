import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
  const cursorOuter = useRef(null);
  const cursorInner = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // ✅ Disable on mobile
    if (window.innerWidth < 768) return;

    const outer = cursorOuter.current;
    const inner = cursorInner.current;
    if (!outer || !inner) return;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: mouse.x, y: mouse.y };

    let isStuck = false;
    let currentTarget = null;
    let rafId;
    let elements = [];

    /* =========================
       RESET CURSOR STATE
    ========================= */
    const resetCursor = () => {
      isStuck = false;
      currentTarget = null;

      outer.style.transition = "all 0.2s ease";
      outer.style.width = "40px";
      outer.style.height = "40px";
      outer.style.borderRadius = "50%";
      outer.style.background = "transparent";
      outer.style.borderColor = "#A6192E";
      outer.style.boxShadow = "none";
      outer.style.transform = `translate(${pos.x - 20}px, ${pos.y - 20}px)`;

      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(1)`;
    };

    /* =========================
       LERP SMOOTH FOLLOW
    ========================= */
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      pos.x = lerp(pos.x, mouse.x, 0.18);
      pos.y = lerp(pos.y, mouse.y, 0.18);

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

      if (isStuck && currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        outer.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
      }
    };

    /* =========================
       HOVER EVENTS
    ========================= */
    const handleEnter = (e) => {
      currentTarget = e.currentTarget;
      isStuck = true;

      const rect = currentTarget.getBoundingClientRect();

      outer.style.transition = "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)";
      outer.style.width = `${rect.width}px`;
      outer.style.height = `${rect.height}px`;
      outer.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
      outer.style.borderRadius = "12px";
      outer.style.background = "rgba(166,25,46,0.12)";
      outer.style.borderColor = "transparent";
      outer.style.boxShadow = "0 0 20px rgba(166,25,46,0.25)";

      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(2.5)`;
    };

    const handleLeave = () => {
      resetCursor();
    };

    /* =========================
       CLICK EFFECT
    ========================= */
    const handleDown = () => {
      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(1.6)`;
      outer.style.transform += " scale(0.9)";
    };

    const handleUp = () => {
      inner.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(1)`;

      if (!isStuck) {
        outer.style.transform = `translate(${pos.x - 20}px, ${pos.y - 20}px) scale(1)`;
      }
    };

    /* =========================
       ATTACH EVENTS SAFELY
    ========================= */
    const attachEvents = () => {
      // 🔥 REMOVE OLD EVENTS FIRST
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });

      // 🔥 GET FRESH ELEMENTS (AFTER ROUTE CHANGE)
      elements = Array.from(
        document.querySelectorAll(
          "button, a, input, textarea, select, .cursor-pointer, .card, [data-cursor]"
        )
      );

      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    /* =========================
       INIT
    ========================= */
    attachEvents();
    resetCursor();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    /* =========================
       CLEANUP (IMPORTANT 🔥)
    ========================= */
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
  }, [location]); // 🔥 runs every route change

  return (
    <>
      {/* OUTER */}
      <div
        ref={cursorOuter}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#A6192E] rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: "transform",
          transition: "all 0.15s ease",
        }}
      />

      {/* INNER */}
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