import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
  const cursorOuter = useRef(null);
  const cursorInner = useRef(null);
  const location = useLocation(); // 👈 detect route change

  useEffect(() => {
    let mouse = { x: -100, y: -100 };
    let isStuck = false;

    const outer = cursorOuter.current;
    const inner = cursorInner.current;

    const updateMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const animate = () => {
      if (!outer || !inner) return;

      const rect = outer.getBoundingClientRect(); // ✅ dynamic

      gsap.set(inner, {
        x: mouse.x,
        y: mouse.y,
      });

      if (!isStuck) {
        gsap.to(outer, {
          duration: 0.15,
          x: mouse.x - rect.width / 2,
          y: mouse.y - rect.height / 2,
        });
      }

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", updateMouse);

    // 🔥 Re-select elements after route change
    const targets = document.querySelectorAll("button, a");

    const handleEnter = (e) => {
      isStuck = true;
      const rect = e.currentTarget.getBoundingClientRect();

      gsap.to(outer, {
        duration: 0.2,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: 10,
        backgroundColor: "rgba(14, 94, 105, 0.2)",
      });
    };

    const handleLeave = () => {
      isStuck = false;

      gsap.to(outer, {
        duration: 0.2,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "transparent",
      });
    };

    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const handleDown = () => {
      gsap.to(inner, { scale: 2, duration: 0.15 });
    };

    const handleUp = () => {
      gsap.to(inner, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // ✅ CLEANUP (VERY IMPORTANT)
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);

      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [location]); // 👈 re-run on page change

  return (
    <>
      {/* Outer Cursor */}
      <div
        ref={cursorOuter}
        className="fixed top-0 left-0 w-10 h-10 border border-[#A6192E] rounded-full pointer-events-none z-[9999]"
      />

      {/* Inner Cursor */}
      <div
        ref={cursorInner}
        className="fixed top-0 left-0 w-3 h-3 bg-[#A6192E] rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};

export default CustomCursor;