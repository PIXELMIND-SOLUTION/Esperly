import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";

/*
  tailwind.config.js — add these to enable the expand transition & custom animations:

  theme: {
    extend: {
      width: {
        "btn-icon": "52px",
        "btn-expanded": "200px",
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        popIn: {
          "0%":   { transform: "scale(0.4)", opacity: "0" },
          "70%":  { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)",   opacity: "1" },
        },
        pulseRing: { to: { transform: "scale(1.6)", opacity: "0" } },
        progressBar: {
          "0%":   { width: "0%",  left: "0" },
          "50%":  { width: "65%", left: "18%" },
          "100%": { width: "0%",  left: "100%" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(250%)" },
        },
        labelSlide: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "spin-slow":    "spin 0.9s linear infinite",
        "pop-in":       "popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275) both",
        "pulse-ring":   "pulseRing 0.7s ease-out forwards",
        "progress-bar": "progressBar 1.1s ease-in-out infinite",
        "shimmer":      "shimmer 2.4s ease-in-out infinite",
        "label-slide":  "labelSlide 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
      },
    },
  },
*/

/* ─── jsPDF loader ──────────────────────────────────────────────────────────── */
function loadJsPDF() {
  return new Promise((resolve) => {
    if (window.jspdf) return resolve(window.jspdf.jsPDF);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s.onload = () => resolve(window.jspdf.jsPDF);
    document.head.appendChild(s);
  });
}

/* ─── PDF brochure generator ────────────────────────────────────────────────── */
async function generateBrochure() {
  const jsPDF = await loadJsPDF();
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, H = 297;

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, W, H, "F");

  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, W, 40, "F");
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 40, W, 20, "F");

  doc.setFillColor(244, 114, 182);
  doc.rect(0, 0, 8, H, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.setTextColor(255, 255, 255);
  doc.text("Your Company", 22, 36);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(224, 231, 255);
  doc.text("Premium Services  ·  Excellence  ·  Trust", 22, 50);

  doc.setDrawColor(244, 114, 182);
  doc.setLineWidth(0.6);
  doc.line(22, 68, W - 20, 68);

  doc.setFontSize(16);
  doc.setTextColor(167, 139, 250);
  doc.setFont("helvetica", "bold");
  doc.text("About Us", 22, 82);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(203, 213, 225);
  const about = doc.splitTextToSize(
    "We are a leading provider of high-quality solutions designed to transform your business. With over a decade of experience, our team of experts delivers innovative approaches tailored to your unique needs.",
    W - 42
  );
  doc.text(about, 22, 92);

  doc.setFontSize(16);
  doc.setTextColor(167, 139, 250);
  doc.setFont("helvetica", "bold");
  doc.text("Our Services", 22, 128);

  const services = [
    ["Consulting",   "Strategic advice to accelerate your growth."],
    ["Development",  "Custom software built for scale and speed."],
    ["Support",      "24/7 dedicated support whenever you need us."],
    ["Training",     "Workshops and coaching for your entire team."],
  ];

  services.forEach(([title, desc], i) => {
    const y = 140 + i * 26;
    doc.setFillColor(30, 27, 75);
    doc.roundedRect(22, y - 6, W - 44, 22, 3, 3, "F");
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(0.4);
    doc.roundedRect(22, y - 6, W - 44, 22, 3, 3, "S");
    doc.setTextColor(167, 139, 250);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title, 30, y + 4);
    doc.setTextColor(203, 213, 225);
    doc.setFont("helvetica", "normal");
    doc.text(desc, 30, y + 11);
  });

  doc.setFontSize(16);
  doc.setTextColor(167, 139, 250);
  doc.setFont("helvetica", "bold");
  doc.text("Contact Us", 22, 252);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(203, 213, 225);
  doc.text("Phone: +91 98765 43210", 22, 262);
  doc.text("Email: hello@yourcompany.com", 22, 270);
  doc.text("Website: www.yourcompany.com", 22, 278);

  doc.setFillColor(30, 27, 75);
  doc.rect(0, H - 16, W, 16, "F");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("© 2025 Your Company · All rights reserved", W / 2, H - 5, { align: "center" });

  doc.save("company-brochure.pdf");
}

/* ─── Download Icon ─────────────────────────────────────────────────────────── */
function DownloadIcon({ state }) {
  if (state === "success")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0 animate-pop-in"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );

  if (state === "loading")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0 animate-spin-slow"
      >
        <path d="M21 12a9 9 0 1 1-9-9" />
      </svg>
    );

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 shrink-0"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ─── Download Brochure Button ───────────────────────────────────────────────── */
const DownloadBrochureButton = () => {
  const [dlState, setDlState]   = useState("idle");
  const [expanded, setExpanded] = useState(false);
  const collapseTimer  = useRef(null);
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

  const handleDownload = async () => {
    if (dlState !== "idle") return;
    clearTimeout(collapseTimer.current);
    clearInterval(expandInterval.current);
    setExpanded(true);
    setDlState("loading");
    try {
      await generateBrochure();
      setDlState("success");
      setTimeout(() => {
        setDlState("idle");
        collapseTimer.current = setTimeout(() => {
          setExpanded(false);
          expandInterval.current = setInterval(triggerExpand, 10000);
        }, 1800);
      }, 2200);
    } catch {
      setDlState("idle");
      expandInterval.current = setInterval(triggerExpand, 10000);
    }
  };

  const label =
    dlState === "success" ? "Downloaded!"       :
    dlState === "loading" ? "Preparing..."      :
                            "Download Brochure";

  /* Tailwind bg gradient per state */
  const btnGradient =
    dlState === "success" ? "bg-gradient-to-br from-[#EB6664] to-[#EB6664]"     :
    dlState === "loading" ? "bg-gradient-to-br from-[#EB6664] to-[#EB6664]"     :
                            "bg-gradient-to-br from-[#EB6664] via-[#EB6664] to-[#EB6664]";

  /* Tailwind shadow per state */
  const btnShadow =
    dlState === "success" ? "shadow-[0_4px_20px_rgba(16,185,129,0.55)]"           :
    dlState === "loading" ? "shadow-[0_4px_20px_rgba(99,102,241,0.55)]"           :
                            "shadow-[0_4px_24px_rgba(168,85,247,0.5),0_1px_6px_rgba(236,72,153,0.35)]";

  return (
    <div className="fixed bottom-24 right-5 z-50 flex items-center group/wrapper">

      {/* Tooltip — only shown when collapsed */}
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
        onClick={handleDownload}
        disabled={dlState === "loading"}
        aria-label="Download Brochure"
        className={[
          /* layout */
          "relative flex items-center overflow-hidden",
          "h-[52px] rounded-full p-0 border-0",
          /* colour */
          btnGradient, btnShadow,
          "text-white",
          /* width transition — springy expand */
          expanded ? "w-[200px]" : "w-[52px]",
          "transition-[width,box-shadow,transform] duration-500",
          "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          /* hover / active */
          "enabled:hover:-translate-y-0.5 enabled:hover:scale-[1.04]",
          "enabled:active:scale-95",
          "disabled:cursor-not-allowed",
        ].join(" ")}
      >
        {/* Shimmer sweep — idle only */}
        {dlState === "idle" && (
          <span className="
            absolute inset-0 pointer-events-none
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            animate-shimmer
          " />
        )}

        {/* Progress bar — loading */}
        {dlState === "loading" && (
          <span className="
            absolute bottom-0 left-0 h-[3px]
            bg-white/50 rounded-full
            animate-progress-bar
          " />
        )}

        {/* Pulse ring — success */}
        {dlState === "success" && (
          <span className="
            absolute inset-0 rounded-full
            bg-emerald-400/40
            animate-pulse-ring
          " />
        )}

        {/* Icon slot — always 52 × 52 */}
        <span className="flex items-center justify-center w-[52px] h-[52px] shrink-0">
          <DownloadIcon state={dlState} />
        </span>

        {/* Label — only when expanded */}
        {expanded && (
          <span
            key={label}
            className="
              text-[13px] font-semibold tracking-wide
              whitespace-nowrap pr-5
              animate-label-slide
            "
          >
            {label}
          </span>
        )}
      </button>
    </div>
  );
};

/* ─── WhatsApp Button ────────────────────────────────────────────────────────── */
const WhatsAppButton = () => {
  const phoneNumber = "919876543210";
  const message     = "Hi! I'm interested in your services.";
  const url         = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 group">
      <div className="
        absolute right-16 top-1/2 -translate-y-1/2
        bg-black text-white text-xs px-3 py-1 rounded-md
        opacity-0 group-hover:opacity-100 transition
        whitespace-nowrap pointer-events-none
      ">
        Connect with us
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative flex items-center justify-center
          w-14 h-14 rounded-full
          bg-green-500 hover:bg-green-600
          text-white shadow-lg
          transition-all duration-300 hover:scale-110
        "
      >
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping" />
        <FaWhatsapp className="text-2xl relative z-10" />
      </a>
    </div>
  );
};

/* ─── Exports ────────────────────────────────────────────────────────────────── */
export { DownloadBrochureButton, WhatsAppButton };

export default function FloatingButtons() {
  return (
    <>
      <DownloadBrochureButton />
      <WhatsAppButton />
    </>
  );
}