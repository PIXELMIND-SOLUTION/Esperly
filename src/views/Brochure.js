import { useState, useEffect, useRef } from "react";
import BrochureModal from "../modals/BrochureModal";

/* ─── Download Icon ─────────────────────────────────────────────────────────── */
function DownloadIcon({ state }) {
  if (state === "success")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 animate-pop-in">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );

  if (state === "loading")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 animate-spin-slow">
        <path d="M21 12a9 9 0 1 1-9-9" />
      </svg>
    );

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const DownloadBrochureButton = () => {
  const [dlState, setDlState] = useState("idle");
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const collapseTimer = useRef(null);
  const expandInterval = useRef(null);

  const triggerExpand = () => {
    setExpanded(true);
    clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setExpanded(false), 3000);
  };

  useEffect(() => {
    const mountDelay = setTimeout(triggerExpand, 600);
    expandInterval.current = setInterval(triggerExpand, 10000);
    return () => {
      clearTimeout(mountDelay);
      clearInterval(expandInterval.current);
      clearTimeout(collapseTimer.current);
    };
  }, []);

  const handleClick = () => {
    if (dlState !== "idle") return;
    setShowModal(true);
    clearTimeout(collapseTimer.current);
    clearInterval(expandInterval.current);
    setExpanded(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    expandInterval.current = setInterval(triggerExpand, 10000);
  };

  const label =
    dlState === "success" ? "Downloaded!" :
      dlState === "loading" ? "Preparing..." :
        "Download Brochure";

  const btnGradient = "bg-gradient-to-br from-[#EB6664] to-[#EB6664]";
  const btnShadow = "shadow-[0_4px_24px_rgba(235,102,100,0.5)]";

  return (
    <>
      {showModal && <BrochureModal onClose={handleModalClose} />}

      <div className="fixed bottom-24 right-5 z-50 flex items-center group/wrapper">
        {/* Tooltip */}
        {!expanded && (
          <div className="
            absolute right-full mr-3.5 top-1/2 -translate-y-1/2
            bg-indigo-950 text-indigo-100
            text-xs font-medium px-3 py-1.5 rounded-lg
            whitespace-nowrap pointer-events-none select-none
            opacity-0 group-hover/wrapper:opacity-100 transition-opacity duration-200
            shadow-lg
            after:content-[''] after:absolute after:right-[-4px] after:top-1/2
            after:-translate-y-1/2 after:rotate-45
            after:w-2 after:h-2 after:bg-indigo-950
          ">
            Download brochure
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleClick}
          disabled={dlState === "loading"}
          aria-label="Download Brochure"
          className={[
            "relative flex items-center overflow-hidden",
            "h-[52px] rounded-full p-0 border-0",
            btnGradient, btnShadow,
            "text-white",
            expanded ? "w-[200px]" : "w-[52px]",
            "transition-[width,box-shadow,transform] duration-500",
            "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "enabled:hover:-translate-y-0.5 enabled:hover:scale-[1.04]",
            "enabled:active:scale-95",
            "disabled:cursor-not-allowed",
          ].join(" ")}
        >
          {/* Shimmer */}
          {dlState === "idle" && (
            <span className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}

          {/* Icon slot */}
          <span className="flex items-center justify-center w-[52px] h-[52px] shrink-0">
            <DownloadIcon state={dlState} />
          </span>

          {/* Label */}
          {expanded && (
            <span key={label} className="text-[13px] font-semibold tracking-wide whitespace-nowrap pr-5 animate-label-slide">
              {label}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default DownloadBrochureButton;