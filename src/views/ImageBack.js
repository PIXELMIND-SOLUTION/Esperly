import { useEffect, useRef, useState } from "react";

export default function ImageBack({ children }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const images = [
        // Row 1 — top strip
        { src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=500&auto=format&fit=crop", alt: "Child using abacus", top: "-2%", left: "0%", width: 260, height: 180, speed: 0.06, rotate: -1.5 },
        { src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=500&auto=format&fit=crop", alt: "Math equations", top: "-2%", left: "22%", width: 260, height: 180, speed: 0.09, rotate: 1 },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop", alt: "Teacher and student", top: "-2%", left: "44%", width: 260, height: 180, speed: 0.07, rotate: -1 },
        { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=500&auto=format&fit=crop", alt: "Classroom learning", top: "-2%", left: "66%", width: 260, height: 180, speed: 0.11, rotate: 1.5 },
        { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=500&auto=format&fit=crop", alt: "Online learning", top: "-2%", left: "88%", width: 260, height: 180, speed: 0.08, rotate: -1 },

        // Row 2
        { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop", alt: "Students learning", top: "17%", left: "0%", width: 260, height: 180, speed: 0.13, rotate: 1 },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop", alt: "Group study", top: "17%", left: "22%", width: 260, height: 180, speed: 0.06, rotate: -1.5 },
        { src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=500&auto=format&fit=crop", alt: "Abacus closeup", top: "17%", left: "44%", width: 260, height: 180, speed: 0.1, rotate: 1.5 },
        { src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=500&auto=format&fit=crop", alt: "Math board", top: "17%", left: "66%", width: 260, height: 180, speed: 0.08, rotate: -1 },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop", alt: "Mentor guiding", top: "17%", left: "88%", width: 260, height: 180, speed: 0.12, rotate: 1 },

        // Row 3
        { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=500&auto=format&fit=crop", alt: "Assessment", top: "36%", left: "0%", width: 260, height: 180, speed: 0.07, rotate: -1 },
        { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=500&auto=format&fit=crop", alt: "Smiling student", top: "36%", left: "22%", width: 260, height: 180, speed: 0.14, rotate: 1.5 },
        { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop", alt: "Children studying", top: "36%", left: "44%", width: 260, height: 180, speed: 0.09, rotate: -1.5 },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop", alt: "Teamwork", top: "36%", left: "66%", width: 260, height: 180, speed: 0.06, rotate: 1 },
        { src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=500&auto=format&fit=crop", alt: "Abacus practice", top: "36%", left: "88%", width: 260, height: 180, speed: 0.11, rotate: -1 },

        // Row 4
        { src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=500&auto=format&fit=crop", alt: "Equations", top: "55%", left: "0%", width: 260, height: 180, speed: 0.1, rotate: 1 },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop", alt: "One on one", top: "55%", left: "22%", width: 260, height: 180, speed: 0.08, rotate: -1.5 },
        { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=500&auto=format&fit=crop", alt: "Classroom", top: "55%", left: "44%", width: 260, height: 180, speed: 0.13, rotate: 1.5 },
        { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=500&auto=format&fit=crop", alt: "Virtual class", top: "55%", left: "66%", width: 260, height: 180, speed: 0.07, rotate: -1 },
        { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop", alt: "Children group", top: "55%", left: "88%", width: 260, height: 180, speed: 0.09, rotate: 1 },

        // Row 5 — bottom strip
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop", alt: "Study group", top: "74%", left: "0%", width: 260, height: 180, speed: 0.12, rotate: -1 },
        { src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=500&auto=format&fit=crop", alt: "Abacus child", top: "74%", left: "22%", width: 260, height: 180, speed: 0.06, rotate: 1.5 },
        { src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=500&auto=format&fit=crop", alt: "Math work", top: "74%", left: "44%", width: 260, height: 180, speed: 0.1, rotate: -1.5 },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop", alt: "Mentor session", top: "74%", left: "66%", width: 260, height: 180, speed: 0.08, rotate: 1 },
        { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=500&auto=format&fit=crop", alt: "Progress tracking", top: "74%", left: "88%", width: 260, height: 180, speed: 0.14, rotate: -1 },

        // Row 6 — overflow safety
        { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=500&auto=format&fit=crop", alt: "Happy student", top: "93%", left: "11%", width: 260, height: 180, speed: 0.07, rotate: 1 },
        { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop", alt: "Learning together", top: "93%", left: "33%", width: 260, height: 180, speed: 0.11, rotate: -1 },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop", alt: "Group session", top: "93%", left: "55%", width: 260, height: 180, speed: 0.09, rotate: 1.5 },
        { src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=500&auto=format&fit=crop", alt: "Abacus class", top: "93%", left: "77%", width: 260, height: 180, speed: 0.06, rotate: -1.5 },
    ];

    return (
        <div className="relative w-full min-h-screen bg-white">

            {/* Fixed parallax image grid */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {images.map((img, i) => {
                    const translateY = scrollY * img.speed;
                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                top: img.top,
                                left: img.left,
                                width: img.width,
                                transform: `translateY(${translateY}px) rotate(${img.rotate}deg)`,
                                willChange: "transform",
                            }}
                        >
                            <div
                                style={{
                                    borderRadius: 14,
                                    overflow: "hidden",
                                    border: "2px solid rgba(235, 102, 100, 0.15)",
                                    opacity: 0.6,
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    style={{
                                        width: "100%",
                                        height: img.height,
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* White wash overlay — keeps text readable */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{ background: "rgba(255,255,255,0.72)" }}
            />

            {/* Page content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}