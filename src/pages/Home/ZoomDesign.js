import { useState } from "react";

const participants = [
  { id: 1, name: "Ryder Smith",       image: "https://randomuser.me/api/portraits/men/1.jpg",  role: null      },
  { id: 2, name: "Ashley Thompson",   image: "https://randomuser.me/api/portraits/women/2.jpg", role: "Trainer" },
  { id: 3, name: "Samantha Rower",    image: "https://randomuser.me/api/portraits/women/3.jpg",  role: null      },
  { id: 4, name: "Barbara Rowan",     image: "https://randomuser.me/api/portraits/women/4.jpg",  role: null      },
  { id: 5, name: "Sebastian Mateo",   image: "https://randomuser.me/api/portraits/men/5.jpg",   role: null      },
  { id: 6, name: "Elena Kendric",     image: "https://randomuser.me/api/portraits/women/6.jpg", role: null      },
  { id: 7, name: "Rosalie Orson",     image: "https://randomuser.me/api/portraits/women/7.jpg", role: "Trainer" },
  { id: 8, name: "Sarah Joseph",      image: "https://randomuser.me/api/portraits/women/8.jpg",  role: null      },
  { id: 9, name: "Avery Adan",        image: "https://randomuser.me/api/portraits/men/9.jpg",   role: null      },
  { id: 10, name: "Elias Gayle",      image: "https://randomuser.me/api/portraits/men/10.jpg",   role: null      },
];

/* ── Icons ── */
const Icon = ({ d, size = 16, className = "", strokeWidth = 1.5, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const MicIcon     = () => <Icon d={["M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z","M19 10v2a7 7 0 01-14 0v-2","M12 19v4","M8 23h8"]} />;
const CamIcon     = () => <Icon d={["M23 7l-7 5 7 5V7z","M1 5h15a2 2 0 012 2v10a2 2 0 01-2 2H1V5z"]} />;
const ShareIcon   = () => <Icon d={["M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8","M16 6l-4-4-4 4","M12 2v13"]} />;
const ScreenIcon  = () => <Icon d={["M2 3h20a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2z","M8 21h8","M12 17v4"]} />;
const PeopleIcon  = () => <Icon d={["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75"]}><circle cx="9" cy="7" r="4" /></Icon>;
const ChevronL    = () => <Icon d="M15 18l-6-6 6-6" />;
const ChevronR    = () => <Icon d="M9 18l6-6-6-6" />;
const DotsIcon    = () => <Icon d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth={2.5} />;
const ChatIcon    = () => <Icon d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />;
const SettingsIcon= () => <Icon d={["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06-.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"]} />;
const ExitIcon    = () => <Icon d={["M10 3H6a2 2 0 00-2 2v14a2 2 0 002 2h4","M17 8l5 4-5 4","M7 12h14"]} />;
const BarIcon     = () => <Icon d={["M18 20V10","M12 20V4","M6 20v-6"]} />;
const PresentIcon = () => <Icon d={["M2 3h20v14H2z","M8 21h8","M12 17v4"]} />;
const QAIcon      = () => <Icon d={["M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3","M12 17h.01"]} />;
const TextIcon    = () => <Icon d={["M4 7V4h16v3","M9 20h6","M12 4v16"]} />;
const ShapeIcon   = () => <Icon d={["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"]} />;
const LineIcon    = () => <Icon d="M5 19L19 5" />;
const PenIcon     = () => <Icon d={["M12 20h9","M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"]} />;
const EraseIcon   = () => <Icon d={["M20 5H9l-7 7 7 7h11a2 2 0 002-2V7a2 2 0 00-2-2z","M18 9l-6 6"]} />;

/* ── Avatar with Image ── */
const Avatar = ({ p, size = "w-10 h-10", text = "text-sm" }) => (
  <div className={`${size} rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800`}>
    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
  </div>
);

/* ── Participant Tile ── */
const ParticipantTile = ({ p, className = "" }) => (
  <div className={`relative bg-gray-800 rounded overflow-hidden flex items-center justify-center ${className}`}>
    <Avatar p={p} size="w-9 h-9" text="text-xs" />
    <div className="absolute bottom-0 left-0 right-0 px-1.5 py-0.5 bg-black/60">
      <p className="text-[9px] text-white truncate">{p.name}</p>
    </div>
    {p.role && (
      <span className="absolute top-1 right-1 bg-emerald-500 text-emerald-950 text-[7px] font-bold px-1 py-0.5 rounded">
        {p.role}
      </span>
    )}
  </div>
);

/* ── Whiteboard Math SVG ── */
const MathBoard = () => (
  <svg viewBox="0 0 500 260" className="w-full h-full" style={{ fontFamily: "'Georgia', serif" }}>
    {/* L'Hopital box */}
    <rect x="16" y="12" width="198" height="70" rx="3" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="28" y="38" fontSize="13" fill="#1e3a8a" fontStyle="italic">lim</text>
    <text x="56" y="38" fontSize="12" fill="#1e3a8a">f(0)</text>
    <text x="92" y="30" fontSize="9" fill="#dc2626">0</text>
    <text x="108" y="38" fontSize="13" fill="#1e3a8a">⇒</text>
    <text x="132" y="38" fontSize="13" fill="#1e3a8a" fontStyle="italic">lim</text>
    <text x="162" y="38" fontSize="12" fill="#1e3a8a">f(x)ʹ</text>
    <line x1="52" y1="43" x2="100" y2="43" stroke="#1e3a8a" strokeWidth="1.2" />
    <text x="28" y="62" fontSize="10" fill="#1e3a8a">x→0  g(0)</text>
    <text x="88" y="60" fontSize="9" fill="#dc2626">0</text>
    <text x="132" y="58" fontSize="10" fill="#1e3a8a">x→0  g(x)²</text>
    <line x1="126" y1="44" x2="204" y2="44" stroke="#1e3a8a" strokeWidth="1.2" />
    {/* sin x / x */}
    <text x="24" y="110" fontSize="13" fill="#1e3a8a" fontStyle="italic">lim</text>
    <text x="24" y="124" fontSize="9" fill="#1e3a8a">x→0</text>
    <text x="58" y="118" fontSize="13" fill="#1e3a8a">sin x</text>
    <line x1="54" y1="122" x2="94" y2="122" stroke="#1e3a8a" strokeWidth="1.2" />
    <text x="68" y="136" fontSize="13" fill="#1e3a8a">x</text>
    <text x="100" y="122" fontSize="13" fill="#1e3a8a">=</text>
    {/* cos x / 1 */}
    <text x="24" y="168" fontSize="13" fill="#1e3a8a" fontStyle="italic">lim</text>
    <text x="24" y="182" fontSize="9" fill="#1e3a8a">x→0</text>
    <text x="58" y="176" fontSize="13" fill="#1e3a8a">cos x</text>
    <line x1="54" y1="180" x2="96" y2="180" stroke="#1e3a8a" strokeWidth="1.2" />
    <text x="68" y="194" fontSize="13" fill="#1e3a8a">1</text>
    <text x="102" y="180" fontSize="13" fill="#1e3a8a">= 1</text>
    <line x1="102" y1="183" x2="124" y2="183" stroke="#1e3a8a" strokeWidth="1.2" />
    <line x1="102" y1="188" x2="128" y2="188" stroke="#1e3a8a" strokeWidth="1.2" />
    {/* Right side equations */}
    <text x="248" y="24" fontSize="13" fill="#1e3a8a">y = x² - 1x - 6</text>
    <text x="248" y="46" fontSize="12" fill="#1e3a8a">(x - 3)(x + 2) = 0</text>
    <text x="248" y="68" fontSize="12" fill="#1e3a8a">yʹ = 2x - 1  ⇒  2x - 1 = 0</text>
    <text x="326" y="86" fontSize="11" fill="#1e3a8a">x = ½</text>
    {/* Axes */}
    <line x1="260" y1="192" x2="490" y2="192" stroke="#374151" strokeWidth="1" />
    <line x1="370" y1="104" x2="370" y2="258" stroke="#374151" strokeWidth="1" />
    <polyline points="268,254 300,218 334,196 370,186 408,196 442,216 478,244"
      fill="none" stroke="#dc2626" strokeWidth="2" />
    <polygon points="488,192 482,188 482,196" fill="#374151" />
    <polygon points="370,102 366,110 374,110" fill="#374151" />
    <text x="364" y="100" fontSize="9" fill="#374151">y</text>
    <text x="484" y="200" fontSize="9" fill="#374151">x</text>
    <text x="350" y="258" fontSize="9" fill="#1e3a8a">-6¼</text>
    <text x="378" y="258" fontSize="9" fill="#1e3a8a">•</text>
  </svg>
);

/* ── Desktop Sidebar Button ── */
const SideBtn = ({ icon, label, danger = false }) => (
  <button className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg w-full cursor-pointer hover:bg-white/10 transition-colors ${danger ? "text-red-400" : "text-gray-400 hover:text-white"}`}>
    <span className="w-4 h-4">{icon}</span>
    <span className="text-[8px] leading-tight">{label}</span>
  </button>
);

/* ── Desktop Bottom Control Button ── */
const CtrlBtn = ({ icon, label, red = false }) => (
  <button className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ${red ? "text-red-400" : "text-gray-300"}`}>
    <span className="w-4 h-4">{icon}</span>
    <span className="text-[9px] leading-tight whitespace-nowrap">{label}</span>
  </button>
);

/* ── Toolbar Tool ── */
const WbTool = ({ icon, label, active = false }) => (
  <button className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded cursor-pointer transition-colors ${active ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:bg-gray-100"}`}>
    <span className="w-3.5 h-3.5">{icon}</span>
    <span className="text-[8px]">{label}</span>
  </button>
);

/* ══════════════════════════════════════
   DESKTOP VIEW
═══════════════════════════════════════ */
const DesktopView = () => {
  const [slide, setSlide] = useState(2);
  const total = 9;

  return (
    <div className="flex flex-col bg-[#1b1d27] rounded-xl overflow-hidden border border-gray-700/60 flex-1 min-w-0" style={{ minWidth: 560 }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#111318] border-b border-gray-700/50">
        <div className="flex items-center gap-2 text-gray-400">
          <button onClick={() => setSlide(s => Math.max(1, s - 1))} className="hover:text-white transition-colors"><ChevronL /></button>
          <span className="text-white text-xs font-medium">Slide {slide} of {total}</span>
          <button onClick={() => setSlide(s => Math.min(total, s + 1))} className="hover:text-white transition-colors"><ChevronR /></button>
        </div>
        <button className="text-[10px] text-gray-400 border border-gray-600 px-2.5 py-1 rounded-md hover:bg-gray-700 transition-colors">
          Show all slides
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 430 }}>
        {/* Sidebar */}
        <div className="w-11 bg-[#111318] flex flex-col items-center py-2 gap-1 border-r border-gray-700/50 flex-shrink-0">
          <SideBtn icon={<Icon d={["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 11a4 4 0 100-8 4 4 0 000 8z"]} size={14} />} label="Invite" />
          <SideBtn icon={<PeopleIcon />} label="People" />
          <SideBtn icon={<QAIcon />} label="Q&A" />
          <SideBtn icon={<BarIcon />} label="Polls" />
          <SideBtn icon={<ChatIcon />} label="Chats" />
          <SideBtn icon={<Icon d={["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"]} size={14} />} label="Handouts" />
          <div className="flex-1" />
          <SideBtn icon={<SettingsIcon />} label="Settings" />
          <SideBtn icon={<ExitIcon />} label="End" danger />
        </div>

        {/* Whiteboard */}
        <div className="flex-1 flex flex-col bg-[#f8f6f1] overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-3 py-1.5 border-b border-gray-200 bg-white/80">
            <WbTool icon={<TextIcon />} label="Text" />
            <WbTool icon={<PenIcon />} label="Draw" active />
            <WbTool icon={<EraseIcon />} label="Erase" />
            <WbTool icon={<ShapeIcon />} label="Shape" />
            <WbTool icon={<LineIcon />} label="Line" />
            <WbTool icon={<Icon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" size={14} />} label="Pen" />
            <WbTool icon={<Icon d={["M12 20h9","M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"]} size={14} />} label="Marker" />
            <div className="ml-auto text-[9px] text-gray-400">Help</div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-3 overflow-hidden">
            <div className="w-full h-full bg-white rounded border border-gray-200 overflow-hidden">
              <MathBoard />
              
            </div>
          </div>
        </div>

        {/* Participant Panel */}
        <div className="w-36 flex-shrink-0 bg-[#111318] border-l border-gray-700/50 overflow-y-auto">
          {/* Host */}
          <div className="relative border-b border-gray-700/30">
            <div className="h-20 bg-indigo-900/50 flex items-center justify-center">
              <Avatar p={participants[0]} size="w-10 h-10" />
            </div>
            <div className="absolute bottom-1 left-1.5 right-1.5">
              <p className="text-[9px] text-white bg-black/60 px-1 py-0.5 rounded truncate">{participants[0].name}</p>
            </div>
          </div>

          {/* Grid pairs */}
          {[participants.slice(1, 3), participants.slice(3, 5), participants.slice(5, 7), participants.slice(7, 9)].map((pair, gi) => (
            <div key={gi} className="grid grid-cols-2 gap-px border-b border-gray-700/30">
              {pair.map(p => (
                <ParticipantTile key={p.id} p={p} className="h-16" />
              ))}
            </div>
          ))}

          {participants.slice(9).map(p => (
            <div key={p.id} className="border-b border-gray-700/30">
              <ParticipantTile p={p} className="h-14" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-[#111318] border-t border-gray-700/50 flex items-center px-3 py-1.5">
        <div className="flex items-center gap-1.5 mr-4">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-[10px] font-semibold tracking-wider">ON AIR</span>
        </div>
        <div className="flex items-center gap-0 flex-1 justify-center">
          <CtrlBtn icon={<MicIcon />}    label="Mic on" />
          <CtrlBtn icon={<CamIcon />}    label="Cam on" />
          <CtrlBtn icon={<ShareIcon />}  label="Share material" />
          <CtrlBtn icon={<ScreenIcon />} label="Screen share" />
          <CtrlBtn icon={<Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2z" fill="#dc2626" size={16} />} label="Stop recording" red />
          <CtrlBtn icon={<PeopleIcon />} label="Breakout rooms" />
          <CtrlBtn icon={<DotsIcon />}   label="" />
        </div>
        <span className="text-gray-500 text-[11px] ml-4">28:37</span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   MOBILE VIEW
═══════════════════════════════════════ */
const MobileView = () => {
  const [activeTab, setActiveTab] = useState("presentation");

  const tabs = [
    { id: "presentation", label: "Presentation", icon: <PresentIcon /> },
    { id: "qa",           label: "Q&A",          icon: <QAIcon /> },
    { id: "chat",         label: "Chat",          icon: <ChatIcon /> },
    { id: "stats",        label: "Stats",         icon: <BarIcon /> },
  ];

  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      {/* Phone Frame */}
      <div className="w-52 bg-[#111318] rounded-[2.2rem] border-2 border-gray-600/70 overflow-hidden shadow-2xl shadow-black/50">
        {/* Screen */}
        <div className="bg-[#1a1d23] overflow-hidden rounded-[2rem]">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-5 pt-3 pb-1.5 bg-[#111318]">
            <span className="text-white text-[11px] font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <svg width="14" height="10" viewBox="0 0 24 16" fill="white">
                <rect x="0" y="10" width="4" height="6" rx="0.5" />
                <rect x="5" y="7"  width="4" height="9" rx="0.5" />
                <rect x="10" y="4" width="4" height="12" rx="0.5" />
                <rect x="15" y="1" width="4" height="15" rx="0.5" />
              </svg>
              {/* WiFi */}
              <svg width="14" height="10" viewBox="0 0 24 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M1 7C5.8 2.3 12 0 12 0s6.2 2.3 11 7" />
                <path d="M4 11C6.9 8.1 12 6 12 6s5.1 2.1 8 5" />
                <path d="M7.5 15C9 13.5 12 12 12 12s3 1.5 4.5 3" />
                <circle cx="12" cy="18" r="1.5" fill="white" />
              </svg>
              {/* Battery */}
              <svg width="20" height="10" viewBox="0 0 28 14" fill="none">
                <rect x="0.5" y="0.5" width="23" height="13" rx="2.5" stroke="white" strokeWidth="1" />
                <rect x="2" y="2" width="18" height="10" rx="1.5" fill="white" />
                <path d="M25 4.5v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Live Bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#111318] border-b border-gray-700/50">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-500 text-[10px] font-bold tracking-widest">LIVE</span>
            <span className="text-white text-[11px] font-semibold ml-auto">01:37:50</span>
            <div className="flex items-center gap-2 ml-2 text-gray-400">
              <span className="w-3 h-3"><CamIcon /></span>
              <span className="w-3 h-3"><MicIcon /></span>
              <span className="w-3 h-3"><DotsIcon /></span>
            </div>
          </div>

          {/* Participant Grid */}
          <div className="grid grid-cols-2 gap-0.5 p-0.5 bg-black/40">
            {participants.slice(0, 8).map(p => (
              <div key={p.id} className="relative h-20 rounded overflow-hidden flex items-center justify-center bg-gray-800">
                <Avatar p={p} size="w-8 h-8" text="text-xs" />
                <div className="absolute bottom-0 left-0 right-0 px-1 py-0.5 bg-black/60">
                  <p className="text-[8px] text-white truncate">{p.name}</p>
                </div>
                {p.role && (
                  <span className="absolute top-1 right-1 bg-emerald-500 text-emerald-950 text-[6px] font-bold px-1 py-0.5 rounded">
                    {p.role}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Tabs */}
          <div className="bg-[#111318] border-t border-gray-700/50 px-1 py-2">
            <div className="flex justify-around">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                    activeTab === tab.id ? "text-emerald-400" : "text-gray-500"
                  }`}
                >
                  <span className="w-3.5 h-3.5">{tab.icon}</span>
                  <span className="text-[7px] leading-none">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 tracking-widest uppercase">Mobile view</p>
    </div>
  );
};

/* ══════════════════════════════════════
   ROOT COMPONENT
═══════════════════════════════════════ */
export default function ZoomDesign() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="flex gap-6 items-start flex-wrap justify-center w-full max-w-7xl">
        <DesktopView />
        <MobileView />
      </div>
    </div>
  );
}