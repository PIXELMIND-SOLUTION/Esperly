import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

/* ─── COLOUR TOKENS (stationery theme) ─────────────────────────────────────────── */
const PAPER   = "#F9F5ED";   // aged cream paper
const PAPER2  = "#F2EBD9";   // slightly darker paper
const PAPER3  = "#EDE3CC";   // notepaper
const RULED   = "#D6CEBA";   // ruled line colour
const INK     = "#1C1209";   // dark ink
const INK2    = "#3A2E1A";   // medium ink
const FADED   = "#7A6E5A";   // faded ink / muted
const RED     = "#A6192E";   // Primary theme color
const RED2    = "#C8203A";   // secondary red
const PENCIL  = "#8C7B6B";   // pencil graphite
const CLIP    = "#9E9E9E";   // paperclip metal
const CLIP2   = "#BDBDBD";   // paperclip highlight
const YELLOW  = "#F5C842";   // sticky note yellow
const BLUE    = "#3B6FA0";   // blue pen ink
const GREEN   = "#2E7D52";   // green highlighter
const TAPE    = "rgba(200,195,170,0.55)"; // scotch tape

/* ─── SVG DECORATIONS ────────────────────────────────────────── */

/* Paperclip SVG */
const Paperclip = ({ size = 48, color = CLIP, rotate = 0, style = {} }) => (
  <svg
    width={size} height={size * 2.2}
    viewBox="0 0 24 52"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
  >
    <path
      d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M12 4 C6 4 4 8 4 12 L4 40 C4 46 8 50 12 50 C16 50 20 46 20 40 L20 14 C20 10 18 7 14 7 C10 7 8 10 8 14 L8 38 C8 41 10 43 12 43 C14 43 16 41 16 38 L16 16"
      stroke={CLIP2}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeDasharray="2 4"
      opacity="0.6"
      fill="none"
    />
  </svg>
);

/* Pen SVG */
const PenSVG = ({ size = 100, rotate = -15, style = {} }) => (
  <svg
    width={size} height={size * 0.14}
    viewBox="0 0 220 30"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
  >
    <rect x="30" y="5" width="150" height="20" rx="10" fill={RED}/>
    <rect x="30" y="5" width="150" height="20" rx="10" stroke={RED2} strokeWidth="1"/>
    <rect x="35" y="7" width="140" height="5" rx="3" fill="rgba(255,255,255,0.15)"/>
    <rect x="155" y="3" width="5" height="22" rx="2" fill={CLIP} stroke={CLIP2} strokeWidth="0.5"/>
    <circle cx="157.5" cy="25" r="3" fill={CLIP}/>
    <polygon points="30,8 30,22 8,15" fill="#C0C0C0"/>
    <polygon points="15,11 15,19 8,15" fill="#888"/>
    <rect x="178" y="5" width="22" height="20" rx="10" fill={RED2}/>
  </svg>
);

/* Ruled paper lines overlay */
const RuledLines = ({ count = 20, topOffset = 60, gap = 26, opacity = 0.4 }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} style={{
        position: "absolute",
        left: 0, right: 0,
        top: topOffset + i * gap,
        height: 1,
        background: RULED,
        opacity: opacity,
      }}/>
    ))}
    {/* Red margin line */}
    <div style={{
      position: "absolute",
      top: 0, bottom: 0,
      left: "clamp(40px,6vw,72px)",
      width: 1.5,
      background: RED,
      opacity: 0.25,
    }}/>
  </div>
);

/* Stamp / badge */
const Stamp = ({ text, color = RED, rotate = -8, style = {} }) => (
  <div style={{
    display: "inline-block",
    border: `2.5px solid ${color}`,
    borderRadius: 4,
    padding: "3px 10px",
    fontFamily: "monospace",
    fontSize: "clamp(9px,1vw,11px)",
    color,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 700,
    transform: `rotate(${rotate}deg)`,
    opacity: 0.75,
    ...style,
  }}>
    {text}
  </div>
);

/* Hand-drawn underline SVG */
const ScribbleUnderline = ({ color = RED, width = "100%", style = {} }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" style={{ width, height: 12, display: "block", ...style }}>
    <path
      d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
    />
  </svg>
);

/* Washi tape strip */
const WashiTape = ({ width = 60, height = 18, color = TAPE, rotate = -2, style = {} }) => (
  <div style={{
    width, height,
    background: color,
    borderLeft: "1px solid rgba(180,170,140,0.3)",
    borderRight: "1px solid rgba(180,170,140,0.3)",
    transform: `rotate(${rotate}deg)`,
    position: "absolute",
    ...style,
  }}/>
);

const categories = [
  {
    title: "School Tuitions",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    icon: "📚",
    description: "Math, Science, Languages & more",
    height: 280,
  },
  {
    title: "Programming",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    icon: "💻",
    description: "Python, JavaScript, Java, C++",
    height: 320,
  },
  {
    title: "Design",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    icon: "🎨",
    description: "UI/UX, Graphic Design, Figma",
    height: 260,
  },
  {
    title: "Languages",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    icon: "🗣️",
    description: "English, Spanish, French, German",
    height: 300,
  },
  {
    title: "Business",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    icon: "📊",
    description: "Marketing, Finance, Entrepreneurship",
    height: 340,
  },
  {
    title: "Exam Prep",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
    icon: "✍️",
    description: "JEE, NEET, UPSC, Banking",
    height: 290,
  },
  {
    title: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    icon: "📊",
    description: "AI, ML, Analytics, Python",
    height: 310,
  },
  {
    title: "Creative Arts",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    icon: "🎭",
    description: "Music, Dance, Drama, Painting",
    height: 270,
  },
  {
    title: "Soft Skills",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
    icon: "💬",
    description: "Communication, Leadership, Interview",
    height: 330,
  },
];

export default function Category() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });
  const [columns, setColumns] = useState(4);
  const [columnItems, setColumnItems] = useState([]);

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distribute items into columns for masonry layout
  useEffect(() => {
    const distributeItems = () => {
      const cols = Array.from({ length: columns }, () => []);
      categories.forEach((item, index) => {
        const colIndex = index % columns;
        cols[colIndex].push({ ...item, originalIndex: index });
      });
      setColumnItems(cols);
    };
    
    distributeItems();
  }, [columns]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: PAPER,
        padding: "clamp(48px,7vw,96px) clamp(20px,5vw,60px)",
        overflow: "hidden",
      }}
    >
      {/* Background ruled lines */}
      <RuledLines count={40} topOffset={0} gap={26} opacity={0.35}/>

      {/* Decorative elements */}
      <div style={{ position: "absolute", top: "5%", left: "3%", opacity: 0.12 }} aria-hidden>
        <PenSVG size={120} rotate={-8}/>
      </div>
      <div style={{ position: "absolute", bottom: "10%", right: "4%", opacity: 0.1 }} aria-hidden>
        <Paperclip size={32} color={CLIP} rotate={-15}/>
      </div>
      <div style={{ position: "absolute", top: "15%", right: "8%", opacity: 0.08 }}>
        <Paperclip size={24} color={CLIP2} rotate={25}/>
      </div>
      
      {/* Dot grid decoration */}
      <svg style={{ position: "absolute", left: "5%", bottom: "15%", opacity: 0.06 }} width="120" height="120">
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 6 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 18 + 9} cy={r * 18 + 9} r="1.2" fill={RED}/>
          ))
        )}
      </svg>

      {/* Content container */}
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(32px,5vw,48px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: RED }}/>
            <span style={{
              fontFamily: "monospace",
              fontSize: "clamp(10px,1.1vw,12px)",
              color: RED,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}>
              Discover
            </span>
            <div style={{ width: 24, height: 2, background: RED }}/>
          </div>

          <h2 style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(28px,4.5vw,52px)",
            fontWeight: 900,
            color: INK,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}>
            Explore{" "}
            <span style={{ color: RED, fontStyle: "italic", position: "relative" }}>
              Categories
              <ScribbleUnderline color={RED} width="100%" style={{ marginTop: 2 }}/>
            </span>
          </h2>

          <p style={{
            fontFamily: "DM Serif Display, Georgia, serif",
            fontSize: "clamp(14px,1.4vw,18px)",
            color: FADED,
            lineHeight: 1.6,
            maxWidth: 500,
          }}>
            Find the right path for your learning journey
          </p>

          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Stamp text="Popular" color={GREEN} rotate={-2}/>
            <Stamp text="New Courses" color={BLUE} rotate={1}/>
            <Stamp text="Certified" color={RED} rotate={-1}/>
          </div>
        </motion.div>

        {/* Masonry Grid with Columns */}
        <div style={{
          display: "flex",
          gap: "clamp(16px,2vw,24px)",
          alignItems: "flex-start",
        }}>
          {columnItems.map((column, colIndex) => (
            <div
              key={colIndex}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "clamp(16px,2vw,24px)",
              }}
            >
              {column.map((item, itemIndex) => (
                <motion.div
                  key={`${colIndex}-${itemIndex}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: (colIndex * 0.1) + (itemIndex * 0.05),
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ y: -4 }}
                  style={{
                    breakInside: "avoid",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    position: "relative",
                    background: PAPER2,
                    borderRadius: 3,
                    overflow: "hidden",
                    border: `1px solid ${RULED}`,
                    boxShadow: "2px 4px 12px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.3s ease",
                  }}>
                    {/* Decorative tape corner */}
                    {item.originalIndex % 3 === 0 && (
                      <WashiTape
                        width={36} height={10} color={TAPE} rotate={-6}
                        style={{ top: -4, left: -6 }}
                      />
                    )}
                    
                    {/* Image Container - Smaller Card */}
                    <div style={{
                      position: "relative",
                      overflow: "hidden",
                      height: item.height,
                    }}>
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      
                      {/* Paper overlay effect */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(255,255,240,0.1) 0%, rgba(0,0,0,0.25) 100%)",
                        pointerEvents: "none",
                      }}/>
                      
                      {/* Icon overlay */}
                      <div style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: `${PAPER}dd`,
                        backdropFilter: "blur(4px)",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        border: `1px solid ${RULED}`,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Content - Smaller Padding */}
                    <div style={{
                      padding: "clamp(10px,1.6vw,14px) clamp(10px,1.6vw,14px)",
                      position: "relative",
                      background: PAPER,
                      borderTop: `1px solid ${RULED}`,
                    }}>
                      {/* Ruled lines inside card */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        overflow: "hidden",
                      }}>
                        {Array.from({ length: 3 }, (_, i) => (
                          <div key={i} style={{
                            position: "absolute",
                            left: 0, right: 0,
                            top: 24 + i * 22,
                            height: 1,
                            background: RULED,
                            opacity: 0.25,
                          }}/>
                        ))}
                      </div>
                      
                      <div style={{ position: "relative", zIndex: 1 }}>
                        <h3 style={{
                          fontFamily: "Fraunces, Georgia, serif",
                          fontSize: "clamp(13px,1.4vw,16px)",
                          fontWeight: 700,
                          color: INK,
                          marginBottom: 6,
                          lineHeight: 1.3,
                        }}>
                          {item.title}
                        </h3>
                        
                        <p style={{
                          fontFamily: "Georgia, serif",
                          fontSize: "clamp(10px,1vw,11px)",
                          color: FADED,
                          marginBottom: 10,
                          lineHeight: 1.4,
                        }}>
                          {item.description}
                        </p>
                        
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 8,
                        }}>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}>
                            <span style={{
                              fontSize: 10,
                              color: GREEN,
                              fontFamily: "monospace",
                            }}>
                              ●
                            </span>
                            <span style={{
                              fontFamily: "monospace",
                              fontSize: "clamp(8px,0.9vw,9px)",
                              color: FADED,
                              letterSpacing: "0.05em",
                            }}>
                              Active
                            </span>
                          </div>
                          
                          <div style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: `${RED}08`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `1px solid ${RED}30`,
                            transition: "all 0.2s",
                          }}>
                            <span style={{
                              fontSize: 12,
                              color: RED,
                              fontFamily: "monospace",
                            }}>
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Paperclip decoration on some cards */}
                    {item.originalIndex % 2 === 0 && (
                      <div style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        opacity: 0.2,
                        pointerEvents: "none",
                      }}>
                        <Paperclip size={16} color={CLIP} rotate={-8}/>
                      </div>
                    )}
                    
                    {/* Stamp badges on specific cards */}
                    {item.originalIndex === 0 && (
                      <div style={{
                        position: "absolute",
                        bottom: 70,
                        right: 8,
                        opacity: 0.7,
                        transform: "rotate(3deg)",
                      }}>
                        <Stamp text="Popular" color={GREEN} rotate={2} style={{ fontSize: 6, padding: "2px 5px" }}/>
                      </div>
                    )}
                    
                    {item.originalIndex === 3 && (
                      <div style={{
                        position: "absolute",
                        bottom: 70,
                        left: 8,
                        opacity: 0.7,
                        transform: "rotate(-2deg)",
                      }}>
                        <Stamp text="New" color={BLUE} rotate={-1} style={{ fontSize: 6, padding: "2px 5px" }}/>
                      </div>
                    )}
                    
                    {item.originalIndex === 6 && (
                      <div style={{
                        position: "absolute",
                        bottom: 70,
                        right: 8,
                        opacity: 0.7,
                        transform: "rotate(5deg)",
                      }}>
                        <Stamp text="Trending" color={RED} rotate={3} style={{ fontSize: 6, padding: "2px 5px" }}/>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom decorative elements */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          marginTop: "clamp(40px,6vw,64px)",
        }}>
          <div style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${RULED}, transparent)`,
          }}/>
          <div style={{
            display: "flex",
            gap: 8,
          }}>
            <Paperclip size={18} color={CLIP} rotate={-5}/>
            <Paperclip size={18} color={CLIP2} rotate={10}/>
            <Paperclip size={18} color={CLIP} rotate={-3}/>
          </div>
          <div style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${RULED}, transparent)`,
          }}/>
        </div>
        
        {/* View All Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "block",
            margin: "32px auto 0",
            background: "transparent",
            color: RED,
            border: `2px solid ${RED}`,
            borderRadius: 3,
            padding: "clamp(10px,1.2vw,14px) clamp(24px,3vw,36px)",
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(12px,1.2vw,14px)",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "all 0.2s",
          }}
        >
          View All Categories →
        </motion.button>
      </div>
    </section>
  );
}