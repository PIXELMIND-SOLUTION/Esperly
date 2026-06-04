import { useEffect, useState } from "react";

export default function SingleImageBack({ children }) {
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

    return (
        <div className="w-full min-h-screen relative" style={{ isolation: "isolate" }}>
            
            {/* Fixed Background Image - Covers entire screen */}
            <div 
                className="fixed inset-0 pointer-events-none" 
                style={{ 
                    zIndex: 0,
                    backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}
            />

            {/* Optional: Subtle dark overlay for better text readability */}
            <div 
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 1,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4))"
                }}
            />

            {/* Page content - scrolls normally over the fixed background */}
            <div className="relative" style={{ zIndex: 2 }}>
                {children}
            </div>
        </div>
    );
}