import { useState } from "react";

const steps = [
  { n: 1, label: "Sign Up",       sub: "Quick & easy registration",        front: "#F4963A", top: "#FBBD7A", side: "#C06D1A", num: "#7A3E00" },
  { n: 2, label: "Assess",        sub: "Understand current level",          front: "#5BB85A", top: "#8ED68D", side: "#3A8539", num: "#1A4A19" },
  { n: 3, label: "Demo",          sub: "Experience before committing",       front: "#E05555", top: "#F09090", side: "#A52F2F", num: "#5C1010" },
  { n: 4, label: "Personalize",   sub: "Tailored learning plan",             front: "#2BBCB8", top: "#72DDD9", side: "#1A8582", num: "#09413F" },
  { n: 5, label: "Assign Mentor", sub: "Match with right expert",            front: "#8B6DD9", top: "#BBA8F0", side: "#5E42A8", num: "#2E1A62" },
  { n: 6, label: "Learn",         sub: "Guided learning sessions",           front: "#3AA8D8", top: "#7ECFEE", side: "#1E6E96", num: "#0A3652" },
  { n: 7, label: "Practice",      sub: "Assignments and tests",              front: "#E8C030", top: "#F5DD80", side: "#A88010", num: "#5A4200" },
  { n: 8, label: "Track",         sub: "Monitor with regular feedback",      front: "#E85FA0", top: "#F4A0CC", side: "#A53068", num: "#5C0E35" },
  { n: 9, label: "Growth",        sub: "Continuous academic improvement",    front: "#6AAEE8", top: "#A8D0F5", side: "#3A72A8", num: "#143A62" },
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

  const sidePoints = [
    `${bx + BAR_W},${by}`,
    `${bx + BAR_W + SKEW},${by - DEPTH}`,
    `${bx + BAR_W + SKEW},${BASE_Y - DEPTH}`,
    `${bx + BAR_W},${BASE_Y}`,
  ].join(" ");

  const topPoints = [
    `${bx},${by}`,
    `${bx + BAR_W},${by}`,
    `${bx + BAR_W + SKEW},${by - DEPTH}`,
    `${bx + SKEW},${by - DEPTH}`,
  ].join(" ");

  const labelCX = bx + BAR_W / 2 + SKEW / 2;
  const dotY = by - DEPTH - 10;
  
  // Adjust label positions based on bar height to prevent overlapping
  const mainLabelY = dotY - (isHovered ? 32 : 22);
  const subLabelY = dotY - 12;

  return (
    <g
      style={{ cursor: "pointer" }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      filter="url(#barShadow)"
    >
      {/* Front face */}
      <rect
        x={bx} y={by}
        width={BAR_W} height={h}
        fill={step.front}
        rx={3}
        style={{ filter: brightness, transition: "filter 0.2s" }}
      />
      {/* Right side */}
      <polygon
        points={sidePoints}
        fill={step.side}
        style={{ filter: brightness, transition: "filter 0.2s" }}
      />
      {/* Top face */}
      <polygon
        points={topPoints}
        fill={step.top}
        style={{ filter: brightness, transition: "filter 0.2s" }}
      />
      {/* Number */}
      <text
        x={bx + BAR_W / 2} y={by + h / 2 + 8}
        textAnchor="middle"
        fontSize={22} fontWeight={700}
        fill={step.num}
      >
        {step.n}
      </text>

      {/* Connector */}
      <line
        x1={labelCX} y1={by - DEPTH}
        x2={labelCX} y2={dotY}
        stroke={step.front}
        strokeWidth={1.2}
        strokeDasharray="3,3"
      />
      <circle cx={labelCX} cy={dotY} r={4} fill={step.front} />

      {/* Main Label */}
      <text
        x={labelCX} y={mainLabelY}
        textAnchor="middle"
        fontSize={12} fontWeight={600}
        fill="#333"
      >
        {step.label}
      </text>
      
      {/* Sub Label - only show on hover */}
      {isHovered && (
        <text
          x={labelCX} y={subLabelY}
          textAnchor="middle"
          fontSize={10}
          fill="#666"
        >
          {step.sub}
        </text>
      )}
    </g>
  );
}

export default function StaircaseChart3D() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-[#FBF7F2] min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-1 text-center">
        Your Learning Journey
      </h1>
      <p className="text-sm text-gray-400 mb-8 text-center">
        9 steps to academic excellence — hover a bar to explore
      </p>

      <div className="w-full max-w-7xl overflow-x-auto">
        <svg
          viewBox="0 0 980 520"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="barShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.18)" />
            </filter>
          </defs>

          {/* Background */}
          <rect width={980} height={520} fill="#FBF7F2" rx={16} />

          {/* Bars */}
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