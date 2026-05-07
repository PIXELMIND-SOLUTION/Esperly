import { useEffect, useState } from "react";

export default function ImageBack({ children }) {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const images = [
        { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format", alt: "Focused student", top: "-3%", left: "-5%", width: 320, height: 220, speed: 0.04, rotate: -2, scale: 1.05, opacity: 0.7, zIndex: 2 },
        { src: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?q=80&w=600&auto=format", alt: "Mathematics learning", top: "-3%", left: "18%", width: 280, height: 200, speed: 0.07, rotate: 1.2, scale: 1, opacity: 0.65, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format", alt: "Teacher guiding", top: "-3%", left: "38%", width: 300, height: 210, speed: 0.05, rotate: -0.8, scale: 1.02, opacity: 0.7, zIndex: 3 },
        { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format", alt: "Collaborative learning", top: "-3%", left: "58%", width: 310, height: 215, speed: 0.09, rotate: 1.5, scale: 1.03, opacity: 0.68, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format", alt: "Classroom engagement", top: "-3%", left: "78%", width: 290, height: 205, speed: 0.06, rotate: -1.2, scale: 1, opacity: 0.72, zIndex: 2 },
        { src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600&auto=format", alt: "Abacus mental math", top: "15%", left: "-2%", width: 270, height: 190, speed: 0.11, rotate: 1.8, scale: 0.98, opacity: 0.6, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format", alt: "Modern classroom", top: "15%", left: "20%", width: 290, height: 200, speed: 0.08, rotate: -1.5, scale: 1.02, opacity: 0.65, zIndex: 2 },
        { src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format", alt: "Study materials", top: "15%", left: "40%", width: 280, height: 195, speed: 0.13, rotate: 0.9, scale: 1, opacity: 0.7, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format", alt: "Group study", top: "15%", left: "60%", width: 300, height: 210, speed: 0.07, rotate: -2.1, scale: 1.04, opacity: 0.62, zIndex: 3 },
        { src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format", alt: "Math equations", top: "15%", left: "80%", width: 275, height: 190, speed: 0.1, rotate: 1.4, scale: 0.99, opacity: 0.68, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format", alt: "Online learning", top: "34%", left: "-3%", width: 260, height: 185, speed: 0.09, rotate: -1, scale: 0.96, opacity: 0.64, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1633613286991-611fe299c4a7?q=80&w=600&auto=format", alt: "Brain development", top: "34%", left: "16%", width: 310, height: 220, speed: 0.12, rotate: 2, scale: 1.05, opacity: 0.7, zIndex: 3 },
        { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format", alt: "Creative learning", top: "34%", left: "38%", width: 285, height: 200, speed: 0.06, rotate: -1.7, scale: 1, opacity: 0.66, zIndex: 2 },
        { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format", alt: "Happy students", top: "34%", left: "58%", width: 295, height: 205, speed: 0.14, rotate: 1.1, scale: 1.02, opacity: 0.69, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format", alt: "Personal attention", top: "34%", left: "78%", width: 270, height: 190, speed: 0.08, rotate: -0.7, scale: 0.97, opacity: 0.63, zIndex: 2 },
        { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format", alt: "Studious environment", top: "52%", left: "-1%", width: 280, height: 195, speed: 0.1, rotate: 1.3, scale: 1, opacity: 0.67, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600&auto=format", alt: "Abacus training", top: "52%", left: "21%", width: 300, height: 210, speed: 0.07, rotate: -1.9, scale: 1.03, opacity: 0.71, zIndex: 2 },
        { src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format", alt: "Resource library", top: "52%", left: "42%", width: 265, height: 185, speed: 0.12, rotate: 0.5, scale: 0.98, opacity: 0.64, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format", alt: "Collaborative session", top: "52%", left: "62%", width: 290, height: 200, speed: 0.09, rotate: 2.2, scale: 1.01, opacity: 0.68, zIndex: 3 },
        { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format", alt: "Future classroom", top: "52%", left: "82%", width: 285, height: 198, speed: 0.11, rotate: -1.4, scale: 1, opacity: 0.66, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format", alt: "Academic excellence", top: "70%", left: "-4%", width: 310, height: 215, speed: 0.13, rotate: -0.5, scale: 1.04, opacity: 0.7, zIndex: 2 },
        { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format", alt: "Peer learning", top: "70%", left: "16%", width: 275, height: 190, speed: 0.08, rotate: 1.7, scale: 0.97, opacity: 0.63, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?q=80&w=600&auto=format", alt: "Math mastery", top: "70%", left: "36%", width: 295, height: 205, speed: 0.1, rotate: -2, scale: 1.02, opacity: 0.69, zIndex: 3 },
        { src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format", alt: "Problem solving", top: "70%", left: "56%", width: 280, height: 195, speed: 0.07, rotate: 0.8, scale: 1, opacity: 0.65, zIndex: 1 },
        { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format", alt: "Mentorship", top: "70%", left: "76%", width: 300, height: 210, speed: 0.12, rotate: -1.1, scale: 1.03, opacity: 0.71, zIndex: 2 },
    ];

    const getTransform = (img) => {
        const scrollOffset = scrollY * img.speed;
        const mouseOffsetX = mousePosition.x * (img.speed * 0.3);
        const mouseOffsetY = mousePosition.y * (img.speed * 0.2);
        const baseRotate = img.rotate;
        const mouseRotateX = mousePosition.y * 0.03;
        const mouseRotateY = mousePosition.x * 0.03;
        
        return `translateY(${scrollOffset + mouseOffsetY}px) translateX(${mouseOffsetX}px) rotate(${baseRotate + mouseRotateX + mouseRotateY}deg) scale(${img.scale})`;
    };

    return (
        // Important: Changed from relative to block, and added isolation context
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-x-hidden" style={{ isolation: "isolate" }}>
            
            {/* Background images - lowest z-index */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-amber-200/20 via-orange-200/15 to-transparent blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-l from-blue-200/20 via-indigo-200/15 to-transparent blur-3xl animate-pulse-slower" />
                <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-purple-200/10 to-pink-200/10 blur-3xl animate-float" />
            </div>

            {/* Fixed parallax image grid - z-index 1 */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
                {images.map((img, i) => {
                    const transform = getTransform(img);
                    return (
                        <div
                            key={i}
                            className="absolute transition-transform duration-100 will-change-transform"
                            style={{
                                top: img.top,
                                left: img.left,
                                width: img.width,
                                transform: transform,
                                opacity: img.opacity,
                                zIndex: img.zIndex || 1,
                                transition: "transform 0.05s linear",
                            }}
                        >
                            <div
                                style={{
                                    borderRadius: 20,
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    boxShadow: "0 15px 35px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5) inset",
                                    backdropFilter: "blur(1px)",
                                    transform: "translateZ(0)",
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
                                        filter: "brightness(0.98) contrast(1.05) saturate(1.1)",
                                    }}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 pointer-events-none" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Frosted glass overlay - z-index 2 */}
            <div 
                className="fixed inset-0 pointer-events-none" 
                style={{ 
                    zIndex: 2,
                    background: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6), rgba(255,255,250,0.85))",
                    backdropFilter: "blur(2px)",
                }}
            />

            {/* Subtle vignette effect - z-index 2 as well */}
            <div 
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 2,
                    boxShadow: "inset 0 0 120px rgba(0,0,0,0.08)",
                }}
            />

            {/* Page content - HIGHEST z-index to allow sticky navbar to work */}
            <div className="relative" style={{ zIndex: 10 }}>
                {children}
            </div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                @keyframes pulse-slower {
                    0%, 100% { opacity: 0.4; transform: scale(1) translate(0, 0); }
                    50% { opacity: 0.7; transform: scale(1.08) translate(2%, 2%); }
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                    50% { transform: translate(3%, -3%) scale(1.1); opacity: 0.5; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .animate-pulse-slower {
                    animation: pulse-slower 12s ease-in-out infinite;
                }
                .animate-float {
                    animation: float 15s ease-in-out infinite;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
                }
            `}</style>
        </div>
    );
}