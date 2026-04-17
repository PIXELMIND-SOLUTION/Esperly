import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import {
    HiOutlineUserGroup,
    HiOutlineLightBulb,
    HiOutlineAcademicCap,
    HiOutlineFire,
    HiOutlineChartBar,
    HiOutlineUser,
} from "react-icons/hi";

const items = [
    { label: "1-on-1 Mentorship available", Icon: HiOutlineUser },

];

const ScrollReveal = () => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [paused, setPaused] = useState(false);

    /* ── auto-cycle ── */
    useEffect(() => {
        if (paused) return;

        const cycle = () => {
            setOpen(true);
            setTimeout(() => setOpen(false), 2800);
            setTimeout(() => setIndex(p => (p + 1) % items.length), 3200);
        };

        cycle();
        const id = setInterval(cycle, 5000);
        return () => clearInterval(id);
    }, [paused]);

    const { label, Icon } = items[index];

    return (
        <div
            className={`
        fixed left-0 top-1/2 -translate-y-1/2 z-50
        flex items-stretch
        transition-transform duration-500
        ${visible ? "translate-x-0" : "-translate-x-[calc(100%-28px)]"}
      `}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* ── PANEL ── */}
            <div
                className={`
          flex items-center gap-3
          bg-[#EB6664] text-white
          rounded-r-2xl
          shadow-[4px_0_32px_rgba(235,102,100,0.25)]
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          overflow-hidden
          ${open
                        ? "max-w-[260px] sm:max-w-[300px] opacity-100 py-4"
                        : "max-w-0 opacity-0 py-4"
                    }
        `}
            >
                {/* icon bubble */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                </div>

                {/* text */}
                <div className="min-w-0">                    
                    <p className="text-sm sm:text-[15px] font-bold text-white whitespace-nowrap leading-tight">
                        {label}
                    </p>
                </div>

                {/* progress dots */}
                <div className="shrink-0 flex flex-col gap-1 ml-1">
                    {items.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-300 ${i === index
                                    ? "h-4 bg-white"
                                    : "h-1 bg-white/30"
                                }`}
                        />
                    ))}
                </div>
            </div>

            
        </div>
    );
};

export default ScrollReveal;