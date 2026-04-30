export default function MathsBack({ children }) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">

      {/* SVG Background */}
      <div className="absolute inset-0 opacity-[0.13] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="mathPattern"
              x="0"
              y="0"
              width="320"
              height="320"
              patternUnits="userSpaceOnUse"
            >
              {/* Equations (spaced out) */}
              <text x="20" y="50" fontSize="16" fill="#EB6664">E = mc²</text>
              <text x="180" y="140" fontSize="15" fill="#EB6664">a² + b² = c²</text>
              <text x="40" y="260" fontSize="14" fill="#EB6664">sin²θ + cos²θ = 1</text>

              {/* Symbols */}
              <text x="260" y="60" fontSize="18" fill="#EB6664">π</text>
              <text x="240" y="260" fontSize="18" fill="#EB6664">∑</text>
              <text x="120" y="200" fontSize="16" fill="#EB6664">∞</text>

              {/* Light geometry */}
              <circle cx="260" cy="200" r="22" stroke="#EB6664" fill="none" strokeWidth="1" />
              <line x1="60" y1="120" x2="140" y2="140" stroke="#EB6664" strokeWidth="1" />

            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#mathPattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 ">
        {children}
      </div>
    </div>
  );
}