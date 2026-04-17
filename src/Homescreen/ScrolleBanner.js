import React, { useEffect, useRef } from "react";

const items = [
    "1-on-1 Mentorship",
    "Expert Guidance",
    "100% Academics Covered",
    "Focused Sessions",
    "Performance Tracker",
];

const ScrollBanner = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Clone the content for infinite scroll effect
        const originalContent = scrollContainer.innerHTML;
        scrollContainer.innerHTML = originalContent + originalContent;

        let scrollSpeed = 2;
        let scrollPosition = 0;

        const animateScroll = () => {
            if (!scrollContainer) return;
            
            scrollPosition += scrollSpeed;
            
            // Reset position when we've scrolled through one set
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }
            
            scrollContainer.scrollLeft = scrollPosition;
            requestAnimationFrame(animateScroll);
        };

        const animation = requestAnimationFrame(animateScroll);

        // Pause on hover
        const handleMouseEnter = () => {
            scrollSpeed = 0;
        };

        const handleMouseLeave = () => {
            scrollSpeed = 1;
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animation);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="w-full h-[50px] bg-[#EB6664] flex items-center overflow-hidden">
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <div className="inline-flex items-center">
                    {[...items, ...items, ...items, ...items].map((text, i) => (
                        <span key={i} className="mx-4 text-white text-sm font-medium inline-block">
                            {text} <span className="text-white/70 ml-8">|</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollBanner;