import { useState } from "react";

const steps = [
  { n: 1, label: "Sign Up", sub: "Quick & easy registration", front: "#F4963A", top: "#FBBD7A", side: "#C06D1A", num: "#7A3E00" },
  { n: 2, label: "Assess", sub: "Understand current level", front: "#5BB85A", top: "#8ED68D", side: "#3A8539", num: "#1A4A19" },
  { n: 3, label: "Demo", sub: "Experience before committing", front: "#E05555", top: "#F09090", side: "#A52F2F", num: "#5C1010" },
  { n: 4, label: "Personalize", sub: "Tailored learning plan", front: "#2BBCB8", top: "#72DDD9", side: "#1A8582", num: "#09413F" },
  { n: 5, label: "Assign Mentor", sub: "Match with right expert", front: "#8B6DD9", top: "#BBA8F0", side: "#5E42A8", num: "#2E1A62" },
  { n: 6, label: "Learn", sub: "Guided learning sessions", front: "#3AA8D8", top: "#7ECFEE", side: "#1E6E96", num: "#0A3652" },
  { n: 7, label: "Practice", sub: "Assignments and tests", front: "#E8C030", top: "#F5DD80", side: "#A88010", num: "#5A4200" },
  { n: 8, label: "Track", sub: "Monitor with regular feedback", front: "#E85FA0", top: "#F4A0CC", side: "#A53068", num: "#5C0E35" },
  { n: 9, label: "Growth", sub: "Continuous academic improvement", front: "#6AAEE8", top: "#A8D0F5", side: "#3A72A8", num: "#143A62" },
];

const BAR_W = 62;
const DEPTH = 16;
const SKEW = 10;
const BASE_Y = 438;
const START_X = 58;
const GAP = 96;
const HEIGHTS = [50, 76, 106, 138, 172, 208, 246, 288, 330];

function Bar3D({ step, index, hovered, onHover }) {
  const h = HEIGHTS[index];
  const bx = START_X + index * GAP;
  const by = BASE_Y - h;
  const isHovered = hovered === index;

  const brightness = isHovered ? "brightness(1.1)" : "brightness(1)";

  const sidePoints = `
    ${bx + BAR_W},${by}
    ${bx + BAR_W + SKEW},${by - DEPTH}
    ${bx + BAR_W + SKEW},${BASE_Y - DEPTH}
    ${bx + BAR_W},${BASE_Y}
  `;

  const topPoints = `
    ${bx},${by}
    ${bx + BAR_W},${by}
    ${bx + BAR_W + SKEW},${by - DEPTH}
    ${bx + SKEW},${by - DEPTH}
  `;

  const labelCX = bx + BAR_W / 2 + SKEW / 2;
  const dotY = by - DEPTH - 10;

  return (
    <g
      style={{ cursor: "pointer" }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      filter="url(#barShadow)"
    >
      {/* FRONT */}
      <rect
        x={bx}
        y={by}
        width={BAR_W}
        height={h}
        fill={step.front}
        rx={3}
        style={{ filter: brightness, transition: "0.2s" }}
      />

      {/* SIDE */}
      <polygon points={sidePoints} fill={step.side} style={{ filter: brightness }} />

      {/* TOP */}
      <polygon points={topPoints} fill={step.top} style={{ filter: brightness }} />

      {/* NUMBER */}
      <text
        x={bx + BAR_W / 2}
        y={by + h / 2 + 8}
        textAnchor="middle"
        fontSize={22}
        fontWeight={700}
        fill={step.num}
      >
        {step.n}
      </text>

      {/* CONNECTOR */}
      <line
        x1={labelCX}
        y1={by - DEPTH}
        x2={labelCX}
        y2={dotY}
        stroke={step.front}
        strokeWidth={1.2}
        strokeDasharray="3,3"
      />
      <circle cx={labelCX} cy={dotY} r={4} fill={step.front} />

      {/* 💎 CARD LABEL */}
      <foreignObject
        x={labelCX - 80}
        y={dotY - 60}
        width="160"
        height="60"
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "6px 10px",
            textAlign: "start",
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            fontFamily: "system-ui",

            /* ✅ KEY FIXES */
            display: "inline-block",
            maxWidth: "160px",   // prevents too wide cards
            whiteSpace: "normal", // allow wrapping
          }}
        >
          {/* TITLE */}
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#333",
              whiteSpace: "nowrap", // keep title in one line
            }}
          >
            {step.label}
          </div>

          {/* SUBTEXT */}
          <div
            style={{
              fontSize: "10px",
              color: "#666",
              marginTop: "3px",
              lineHeight: "1.3",
              wordBreak: "break-word", // wrap properly
            }}
          >
            {step.sub}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

const Highlight = ({ children, colorClass = "from-transparent via-transparent to-yellow-200" }) => (
  <span
    className="relative inline"
    style={{
      background: "linear-gradient(180deg, transparent 40%, #f08e8c 40%)",
      paddingBottom: 2,
    }}
  >
    {children}
  </span>
);

export default function StaircaseChart3D() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-[#FBF7F2] flex flex-col items-center justify-center p-4 sm:p-4">

      <h1 className="text-xl sm:text-5xl font-bold mb-2 text-center">
        <span className="text-[#EB6664]">Esperly's</span> Structured Onboarding Journey
      </h1>

      <div className="w-full max-w-7xl">
        <svg viewBox="0 0 980 520" width="100%">
          <defs>
            <filter id="barShadow">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.18)" />
            </filter>
          </defs>

          <rect width={980} height={520} fill="#FBF7F2" rx={16} />

          {steps.map((step, i) => (
            <Bar3D
              key={step.n}
              step={step}
              index={i}
              hovered={hovered}
              onHover={setHovered}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}


// import { useState } from "react";

// const steps = [
//   { n:"01", label:"Sign Up",       sub:"Quick & easy registration",     bg:"#E8622A", fold:"#B84A18", badge:"#FDE8DC", text:"#B84A18",
//     icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></> },
//   { n:"02", label:"Assess",        sub:"Understand current level",       bg:"#3EA8D8", fold:"#2378A8", badge:"#D6EEF9", text:"#2378A8",
//     icon: <><path d="M9 11l3 3 8-8"/><path d="M21 12c0 5-3.6 9-9 9a9 9 0 1 1 0-18c2.1 0 4 .7 5.5 1.9"/></> },
//   { n:"03", label:"Demo",          sub:"Experience before committing",   bg:"#E8A020", fold:"#B87010", badge:"#FAEBD0", text:"#B87010",
//     icon: <polygon points="5,3 19,12 5,21"/> },
//   { n:"04", label:"Personalize",   sub:"Tailored learning plan",         bg:"#5BAA5B", fold:"#3A7A3A", badge:"#DCF0DC", text:"#3A7A3A",
//     icon: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></> },
//   { n:"05", label:"Assign Mentor", sub:"Match with right expert",        bg:"#5E55CC", fold:"#3E35A0", badge:"#E4E2F8", text:"#3E35A0",
//     icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
//   { n:"06", label:"Learn",         sub:"Guided learning sessions",       bg:"#2BAAB5", fold:"#1A7A85", badge:"#D4EFF1", text:"#1A7A85",
//     icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></> },
//   { n:"07", label:"Practice",      sub:"Assignments and tests",          bg:"#D85A30", fold:"#A83A18", badge:"#F8E2DA", text:"#A83A18",
//     icon: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> },
//   { n:"08", label:"Track",         sub:"Monitor with feedback",          bg:"#C050A0", fold:"#902878", badge:"#F5DDF0", text:"#902878",
//     icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
//   { n:"09", label:"Growth",        sub:"Continuous improvement",         bg:"#3880C8", fold:"#1850A0", badge:"#D8E9F8", text:"#1850A0",
//     icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></> },
// ];

// function Icon({ paths }) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//       stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       {paths}
//     </svg>
//   );
// }

// function RibbonCard({ step, hovered, onHover, index }) {
//   const active = hovered === index;
//   return (
//     <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column",
//       alignItems:"center", width:110, flexShrink:0 }}
//       onMouseEnter={() => onHover(index)} onMouseLeave={() => onHover(null)}>
//       <div style={{ position:"absolute", bottom:"100%", left:"50%", width:1, height:14,
//         background:step.bg, transform:"translateX(-50%)" }} />
//       <div style={{ position:"absolute", bottom:"calc(100% + 14px)", left:"50%", width:6, height:6,
//         borderRadius:"50%", background:step.bg, transform:"translateX(-50%)" }} />
//       <div style={{
//         width:90, borderRadius:"12px 12px 3px 3px", background:step.bg,
//         position:"relative", display:"flex", flexDirection:"column",
//         alignItems:"center", padding:"14px 10px 12px", cursor:"pointer",
//         boxShadow: active
//           ? `0 16px 32px ${step.bg}55`
//           : `0 8px 24px ${step.bg}44`,
//         transform: active ? "translateY(-8px) scale(1.04)" : "none",
//         transition:"transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s",
//       }}>
//         <div style={{ position:"absolute", left:-10, bottom:0, width:0, height:0,
//           borderRight:"10px solid transparent", borderBottom:`13px solid ${step.fold}` }} />
//         <div style={{ position:"absolute", right:-10, bottom:0, width:0, height:0,
//           borderLeft:"10px solid transparent", borderBottom:`13px solid ${step.fold}` }} />
//         <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.22)",
//           display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
//           <Icon paths={step.icon} />
//         </div>
//         <div style={{ fontSize:10, fontWeight:600, color:"#fff", textAlign:"center",
//           textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4, lineHeight:1.2 }}>
//           {step.label}
//         </div>
//         <div style={{ fontSize:9, color:"rgba(255,255,255,0.82)", textAlign:"center",
//           lineHeight:1.35, marginBottom:8, flex:1 }}>{step.sub}</div>
//         <div style={{ fontSize:24, fontWeight:500, color:"rgba(255,255,255,0.95)" }}>{step.n}</div>
//       </div>
//     </div>
//   );
// }

// export default function OnboardingJourney() {
//   const [hovered, setHovered] = useState(null);

//   return (
//     <div style={{ background:"#F4F4F2", padding:"2rem 1.5rem 2.5rem",
//       borderRadius:20, fontFamily:"system-ui,sans-serif" }}>

//       <div style={{ textAlign:"center", marginBottom:"2rem" }}>
//         <h1 style={{ fontSize:26, fontWeight:600, margin:"0 0 4px", color:"#1a1a1a" }}>
//           <span style={{ color:"#E05555" }}>Esperly's</span> Structured Onboarding Journey
//         </h1>
//         <p style={{ fontSize:13, color:"#666", margin:0 }}>
//           From first click to continuous growth — every step designed with purpose
//         </p>
//       </div>

//       <div style={{ overflowX:"auto", paddingBottom:8 }}>
//         <div style={{ position:"relative", display:"flex", alignItems:"center",
//           gap:0, minWidth:"max-content", padding:"70px 0 16px" }}>
//           <div style={{ position:"absolute", top:"50%", left:0, right:0, height:40,
//             transform:"translateY(-50%)", background:"#fff",
//             borderTop:"0.5px solid #e5e7eb", borderBottom:"0.5px solid #e5e7eb",
//             boxShadow:"0 1px 6px rgba(0,0,0,0.07)" }} />
//           {steps.map((s, i) => (
//             <RibbonCard key={s.n} step={s} index={i} hovered={hovered} onHover={setHovered} />
//           ))}
//         </div>
//       </div>

//       {/* Responsive grid below for mobile */}
//       <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",
//         gap:12, marginTop:"2rem" }}>
//         {steps.map(s => (
//           <div key={s.n} style={{ background:"#fff", border:"0.5px solid #e5e7eb",
//             borderRadius:12, padding:14, display:"flex", alignItems:"flex-start", gap:10 }}>
//             <div style={{ width:32, height:32, borderRadius:8, background:s.badge,
//               display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                 stroke={s.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 {s.icon}
//               </svg>
//             </div>
//             <div style={{ flex:1, minWidth:0 }}>
//               <p style={{ fontSize:11, fontWeight:600, color:"#1a1a1a", margin:"0 0 2px",
//                 whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.label}</p>
//               <p style={{ fontSize:10, color:"#666", margin:0, lineHeight:1.3 }}>{s.sub}</p>
//             </div>
//             <span style={{ fontSize:11, fontWeight:600, background:s.badge,
//               color:s.text, padding:"2px 7px", borderRadius:20, flexShrink:0 }}>{s.n}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }