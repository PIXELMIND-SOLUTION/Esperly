import React, { useEffect, useRef } from "react";
import { PiBookOpenFill, PiLightbulbFill, PiTargetFill, PiUserFill } from "react-icons/pi";
import { BsBarChartFill } from "react-icons/bs";

const items = [
  { text: "1-on-1 Mentorship", icon: PiUserFill },
  { text: "Expert Guidance", icon: PiLightbulbFill },
  { text: "100% Academics Covered", icon: PiBookOpenFill },
  { text: "Focused Sessions", icon: PiTargetFill },
  { text: "Performance Tracker", icon: BsBarChartFill },
];

const ScrollBanner = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 2; // smoother
    let scrollPosition = 0;
    let animationFrame;

    const animateScroll = () => {
      scrollPosition += scrollSpeed;

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(animateScroll);
    };

    animationFrame = requestAnimationFrame(animateScroll);

    // Pause on hover
    const handleMouseEnter = () => (scrollSpeed = 0);
    const handleMouseLeave = () => (scrollSpeed = 1);

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full bg-[#EB6664] flex items-center overflow-hidden 
                    h-[44px] sm:h-[50px] md:h-[56px]">
      
      <div
        ref={scrollRef}
        className="w-full overflow-x-hidden whitespace-nowrap"
      >
        <div className="inline-flex items-center">
          {[...items, ...items].map((item, i) => {
            const Icon = item.icon;

            return (
              <span
                key={i}
                className="flex items-center mx-4 sm:mx-6 md:mx-8 
                           text-white text-xs sm:text-sm md:text-base font-medium"
              >
                {/* Icon */}
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 opacity-90" />

                {/* Text */}
                {item.text}

                {/* Separator */}
                <span className="text-white/70 ml-6 sm:ml-8">|</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollBanner;