import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── TOKENS (updated with new color theme) ── */
const CR   = "#A6192E";  // Primary color - kept consistent
const CR2  = "#C8203A";  // Secondary red
const GOLD = "#B8892A";
const GOLD2= "#D4A843";
const BG   = "#FAF7F2";
const BG2  = "#F3EDE4";
const SURF = "#FFFCF8";
const BORD = "#E5DDD0";
const INK  = "#1A1410";
const INK2 = "#3D3428";
const MUTE = "#8C7F6E";
const LITE = "#C9BFB0";

/* ── CURRICULUM DATA with updated color theme ── */
const chapters = [
  {
    number: "01",
    subject: "Full Stack Development",
    icon: "⬡",
    color: CR,  // Using primary color
    tagline: "From zero to production",
    topics: ["HTML & CSS Mastery", "JavaScript ES6+", "React & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "REST & GraphQL APIs", "Docker & Deployment"],
    description: "Build complete web applications from the ground up. Learn how the frontend talks to the backend, how data flows, and how to ship products that scale.",
    duration: "240 hours",
    projects: "12 real projects",
    pageColor: "#FFF8F5",
    spineColor: CR,  // Using primary color
  },
  {
    number: "02",
    subject: "Data Science",
    icon: "⬢",
    color: CR,  // Using primary color
    tagline: "Turn raw data into decisions",
    topics: ["Python & NumPy", "Pandas & EDA", "Data Visualisation", "Statistics & Probability", "Scikit-learn", "Feature Engineering", "Model Deployment"],
    description: "Master the full data pipeline — from messy CSVs to insight dashboards. Learn to ask the right questions and build models that actually get used.",
    duration: "200 hours",
    projects: "10 real projects",
    pageColor: "#FFFBF0",
    spineColor: CR,  // Using primary color
  },
  {
    number: "03",
    subject: "UI / UX Design",
    icon: "⬣",
    color: CR,  // Using primary color
    tagline: "Design that thinks and feels",
    topics: ["Design Principles", "User Research", "Wireframing", "Figma Mastery", "Prototyping", "Usability Testing", "Design Systems"],
    description: "Go beyond aesthetics. Understand how people think, how interfaces should behave, and how to design with empathy that converts users into fans.",
    duration: "160 hours",
    projects: "8 real projects",
    pageColor: "#F5FAFF",
    spineColor: CR,  // Using primary color
  },
  {
    number: "04",
    subject: "Product Management",
    icon: "⬡",
    color: CR,  // Using primary color
    tagline: "Strategy meets execution",
    topics: ["Product Thinking", "Market Research", "PRDs & Roadmaps", "Agile & Scrum", "Metrics & OKRs", "Stakeholder Mgmt", "Go-to-Market"],
    description: "Learn to be the CEO of your product. Understand users, align teams, prioritise ruthlessly, and ship features that move the needle.",
    duration: "180 hours",
    projects: "9 real projects",
    pageColor: "#F5FFF5",
    spineColor: CR,  // Using primary color
  },
  {
    number: "05",
    subject: "AI & Machine Learning",
    icon: "⬢",
    color: CR,  // Using primary color
    tagline: "Build intelligent systems",
    topics: ["Linear & Logistic Reg.", "Neural Networks", "CNNs & RNNs", "NLP & Transformers", "Prompt Engineering", "LLM Fine-tuning", "MLOps"],
    description: "From perceptrons to large language models. Learn the mathematics, the intuition, and the engineering to build AI systems that work in the real world.",
    duration: "220 hours",
    projects: "11 real projects",
    pageColor: "#FDF5FF",
    spineColor: CR,  // Using primary color
  },
  {
    number: "06",
    subject: "Cloud & DevOps",
    icon: "⬣",
    color: CR,  // Using primary color
    tagline: "Ship fast. Stay reliable.",
    topics: ["Linux & Bash", "AWS / GCP / Azure", "CI / CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code", "Monitoring & Logging", "Security Best Practices"],
    description: "Master the infrastructure that keeps apps alive. Learn to automate deployments, scale systems, and build pipelines that ship code safely every day.",
    duration: "190 hours",
    projects: "9 real projects",
    pageColor: "#FFF8F0",
    spineColor: CR,  // Using primary color
  },
];

const FLIP_DURATION = 0.7;
const AUTO_INTERVAL = 3800;

/* ── PAGE LINES (decorative ruled lines on book page) ── */
const PageLines = ({ color }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {Array.from({ length: 18 }, (_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 0, right: 0,
          top: 72 + i * 22,
          height: 1,
          background: color + "22",
        }}
      />
    ))}
    {/* Margin line */}
    <div style={{
      position: "absolute",
      left: 52, top: 0, bottom: 0,
      width: 1,
      background: color + "18",
    }}/>
  </div>
);

/* ── BOOK SPINE ── */
const BookSpine = ({ chapter, isActive }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: `linear-gradient(180deg, ${chapter.spineColor}ee 0%, ${chapter.spineColor}cc 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Spine texture */}
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.08) 100%)",
    }}/>
    <span style={{
      fontFamily: "Fraunces, Georgia, serif",
      fontSize: 11,
      fontWeight: 900,
      color: "rgba(255,255,255,0.9)",
      letterSpacing: "0.18em",
      writingMode: "vertical-rl",
      textOrientation: "mixed",
      transform: "rotate(180deg)",
      textTransform: "uppercase",
      position: "relative",
      zIndex: 1,
      maxHeight: 180,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}>
      {chapter.subject}
    </span>
    <span style={{
      fontFamily: "monospace",
      fontSize: 9,
      color: "rgba(255,255,255,0.55)",
      writingMode: "vertical-rl",
      transform: "rotate(180deg)",
      letterSpacing: "0.12em",
      position: "relative",
      zIndex: 1,
    }}>
      {chapter.number}
    </span>
  </div>
);

/* ── SINGLE PAGE VIEW (for mobile) ── */
const SinglePageView = ({ chapter, onNext, onPrev, isFlipping }) => {
  const [showBack, setShowBack] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowBack(!showBack);
    setTimeout(() => setIsAnimating(false), FLIP_DURATION * 1000);
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      perspective: "1500px",
    }}>
      <motion.div
        animate={{ rotateY: showBack ? 180 : 0 }}
        transition={{ duration: FLIP_DURATION, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          cursor: "pointer",
        }}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          background: chapter.pageColor,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}>
          <div style={{
            padding: "clamp(20px,4vw,32px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}>
            <PageLines color={chapter.color}/>
            <div style={{
              fontSize: "clamp(40px,8vw,56px)",
              color: chapter.color,
              marginBottom: 16,
              position: "relative",
              zIndex: 1,
            }}>
              {chapter.icon}
            </div>
            <h3 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(20px,5vw,26px)",
              fontWeight: 900,
              color: INK,
              marginBottom: 10,
              position: "relative",
              zIndex: 1,
            }}>
              {chapter.subject}
            </h3>
            <p style={{
              fontFamily: "DM Serif Display, Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(12px,3vw,14px)",
              color: chapter.color,
              marginBottom: 20,
              position: "relative",
              zIndex: 1,
            }}>
              {chapter.tagline}
            </p>
            <div style={{
              width: 40,
              height: 2,
              background: `linear-gradient(90deg, ${chapter.color}, ${chapter.color}44)`,
              marginBottom: 20,
              borderRadius: 2,
            }}/>
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(12px,3vw,13px)",
              color: MUTE,
              lineHeight: 1.6,
              marginBottom: 20,
              position: "relative",
              zIndex: 1,
            }}>
              {chapter.description}
            </p>
            <div style={{
              display: "flex",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}>
              {[chapter.duration, chapter.projects].map((stat, i) => (
                <div key={i} style={{
                  background: chapter.color + "10",
                  border: `1px solid ${chapter.color}28`,
                  borderRadius: 8,
                  padding: "6px 12px",
                }}>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: "clamp(9px,2.5vw,11px)",
                    color: chapter.color,
                    fontWeight: 700,
                  }}>
                    {stat}
                  </span>
                </div>
              ))}
            </div>
            <div style={{
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 11,
              color: MUTE,
              fontFamily: "monospace",
            }}>
              Tap to flip →
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: SURF,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}>
          <div style={{
            padding: "clamp(20px,4vw,32px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}>
            <PageLines color="#8C7F6E"/>
            <div style={{
              fontFamily: "monospace",
              fontSize: "clamp(9px,2.5vw,11px)",
              color: MUTE,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}>
              Chapter {chapter.number} · Curriculum
            </div>
            <h4 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(13px,3.5vw,16px)",
              fontWeight: 700,
              color: INK,
              marginBottom: 18,
              paddingBottom: 12,
              borderBottom: `1px solid ${BORD}`,
            }}>
              What you'll learn
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 1,
              overflowY: "auto",
            }}>
              {chapter.topics.map((topic, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}>
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: chapter.color,
                    flexShrink: 0,
                  }}/>
                  <span style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(11px,3vw,13px)",
                    color: INK2,
                    flex: 1,
                  }}>
                    {topic}
                  </span>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: LITE,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            <div style={{
              borderTop: `1px solid ${BORD}`,
              paddingTop: 12,
              marginTop: 14,
              display: "flex",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: MUTE,
              }}>
                ESPERLY
              </span>
              <span style={{
                fontFamily: "Georgia, serif",
                fontSize: 11,
                color: MUTE,
                fontStyle: "italic",
              }}>
                pg. {chapter.number}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation buttons for mobile */}
      <div style={{
        position: "absolute",
        bottom: -60,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 20,
        padding: "10px",
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onPrev(); setShowBack(false); }}
          disabled={isFlipping}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1.5px solid ${BORD}`,
            background: SURF,
            color: INK,
            fontSize: 20,
            cursor: isFlipping ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isFlipping ? 0.4 : 1,
          }}
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onNext(); setShowBack(false); }}
          disabled={isFlipping}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `1.5px solid ${BORD}`,
            background: SURF,
            color: INK,
            fontSize: 20,
            cursor: isFlipping ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isFlipping ? 0.4 : 1,
          }}
        >
          →
        </motion.button>
      </div>
    </div>
  );
};

/* ── DESKTOP BOOK VIEW (two-page spread) ── */
const DesktopBookView = ({ current, next, isFlipping, flipDir, flipAngle, chapters, onPrev, onNext }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "clamp(12px,2vw,24px)",
    }}>
      {/* Prev button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onPrev}
        disabled={isFlipping}
        style={{
          width: "clamp(36px,4vw,48px)",
          height: "clamp(36px,4vw,48px)",
          borderRadius: "50%",
          border: `1.5px solid ${BORD}`,
          background: SURF,
          color: INK,
          fontSize: 18,
          cursor: isFlipping ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          opacity: isFlipping ? 0.4 : 1,
          transition: "opacity 0.2s",
          flexShrink: 0,
        }}
      >
        ←
      </motion.button>

      {/* BOOK */}
      <div
        style={{
          width: "clamp(300px,75vw,820px)",
          height: "clamp(300px,45vw,500px)",
          position: "relative",
        }}
      >
        {/* Book shadow */}
        <div style={{
          position: "absolute",
          bottom: -18,
          left: "5%",
          right: "5%",
          height: 28,
          background: "rgba(0,0,0,0.18)",
          filter: "blur(16px)",
          borderRadius: "50%",
          zIndex: 0,
        }}/>

        {/* Book body */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: 6,
          boxShadow: "0 12px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
          zIndex: 1,
        }}>
          {/* SPINE */}
          <div style={{
            width: "clamp(18px,2.5vw,32px)",
            flexShrink: 0,
            borderRadius: "4px 0 0 4px",
            overflow: "hidden",
            boxShadow: "inset -4px 0 12px rgba(0,0,0,0.18)",
            zIndex: 3,
            position: "relative",
          }}>
            <BookSpine chapter={chapters[current]} isActive={true}/>
          </div>

          {/* LEFT PAGE — static, shows current chapter info */}
          <div style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            borderRight: `1px solid ${BORD}`,
            zIndex: 2,
          }}>
            {/* Show next chapter's left page while flipping forward */}
            <div style={{
              position: "absolute", inset: 0,
              opacity: isFlipping && flipDir === "forward" ? Math.min((-flipAngle) / 90, 1) : (isFlipping && flipDir === "backward" ? Math.min(flipAngle / 90, 1) : 0),
              transition: "none",
            }}>
              <LeftPage chapter={chapters[next]}/>
            </div>
            <div style={{
              position: "absolute", inset: 0,
              opacity: isFlipping ? (flipDir === "forward" ? Math.max(1 - (-flipAngle) / 90, 0) : Math.max(1 - flipAngle / 90, 0)) : 1,
            }}>
              <LeftPage chapter={chapters[current]}/>
            </div>

            {/* Page edge shadow (centre gutter) */}
            <div style={{
              position: "absolute",
              top: 0, bottom: 0,
              right: 0,
              width: 20,
              background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06))",
              pointerEvents: "none",
              zIndex: 4,
            }}/>
          </div>

          {/* RIGHT — flip container */}
          <div style={{
            flex: 1,
            position: "relative",
            overflow: "visible",
            zIndex: isFlipping ? 10 : 2,
          }}>
            {/* Static right page (revealed from beneath during flip) */}
            <div style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              borderRadius: "0 4px 4px 0",
              overflow: "hidden",
            }}>
              {/* Show the "destination" right page beneath the flipping page */}
              {isFlipping && flipDir === "forward" && (
                <RightPage chapter={chapters[next]}/>
              )}
              {isFlipping && flipDir === "backward" && (
                <RightPage chapter={chapters[current]}/>
              )}
              {!isFlipping && (
                <RightPage chapter={chapters[current]}/>
              )}
            </div>

            {/* THE FLIPPING PAGE */}
            {isFlipping && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center",
                  transform: `rotateY(${flipAngle}deg)`,
                  zIndex: 20,
                  filter: `drop-shadow(${flipAngle < -45 || flipAngle > 45 ? "4px" : "0px"} 0 16px rgba(0,0,0,0.22))`,
                }}
              >
                {/* FRONT FACE of flipping page */}
                <div
                  className="page-face"
                  style={{
                    borderRadius: "0 4px 4px 0",
                    overflow: "hidden",
                    boxShadow: "inset -1px 0 0 rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Gloss highlight that moves during flip */}
                  <div style={{
                    position: "absolute",
                    top: 0, bottom: 0,
                    right: 0,
                    width: `${Math.max(0, 20 - Math.abs(flipAngle) / 6)}%`,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22))",
                    zIndex: 5,
                    pointerEvents: "none",
                  }}/>
                  {flipDir === "forward" ? (
                    <RightPage chapter={chapters[current]}/>
                  ) : (
                    <RightPage chapter={chapters[next]}/>
                  )}
                </div>

                {/* BACK FACE of flipping page */}
                <div
                  className="page-face page-face-back"
                  style={{
                    borderRadius: "0 4px 4px 0",
                    overflow: "hidden",
                  }}
                >
                  {/* Back face gloss */}
                  <div style={{
                    position: "absolute",
                    top: 0, bottom: 0,
                    left: 0,
                    width: `${Math.max(0, 20 - Math.abs(flipAngle + 180) / 6)}%`,
                    background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.15))",
                    zIndex: 5,
                    pointerEvents: "none",
                  }}/>
                  {flipDir === "forward" ? (
                    <LeftPage chapter={chapters[next]}/>
                  ) : (
                    <LeftPage chapter={chapters[current]}/>
                  )}
                </div>
              </div>
            )}

            {/* Left edge shadow (centre gutter) */}
            <div style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: 0,
              width: 20,
              background: "linear-gradient(270deg, transparent, rgba(0,0,0,0.06))",
              pointerEvents: "none",
              zIndex: 4,
              borderRadius: "0 4px 4px 0",
            }}/>
          </div>
        </div>

        {/* Stacked pages illusion — bottom edge */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: -(i + 1) * 2,
              left: `calc(clamp(18px,2.5vw,32px) + ${i * 0.5}px)`,
              right: -(i * 0.5),
              height: "100%",
              background: i % 2 === 0 ? "#f0ebe3" : "#e8e0d4",
              borderRadius: 6,
              zIndex: -i - 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
          />
        ))}
      </div>

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onNext}
        disabled={isFlipping}
        style={{
          width: "clamp(36px,4vw,48px)",
          height: "clamp(36px,4vw,48px)",
          borderRadius: "50%",
          border: `1.5px solid ${BORD}`,
          background: SURF,
          color: INK,
          fontSize: 18,
          cursor: isFlipping ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          opacity: isFlipping ? 0.4 : 1,
          transition: "opacity 0.2s",
          flexShrink: 0,
        }}
      >
        →
      </motion.button>
    </div>
  );
};

const LeftPage = ({ chapter }) => (
  <div style={{
    width: "100%",
    height: "100%",
    background: chapter.pageColor,
    padding: "clamp(24px,3vw,40px) clamp(20px,2.5vw,36px)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }}>
    <PageLines color={chapter.color}/>

    {/* Big decorative number */}
    <div style={{
      fontFamily: "Fraunces, Georgia, serif",
      fontSize: "clamp(80px,12vw,140px)",
      fontWeight: 900,
      color: chapter.color,
      opacity: 0.07,
      lineHeight: 1,
      position: "absolute",
      bottom: -10,
      right: -10,
      pointerEvents: "none",
      userSelect: "none",
    }}>
      {chapter.number}
    </div>

    {/* Icon */}
    <div style={{
      fontSize: "clamp(36px,5vw,56px)",
      color: chapter.color,
      marginBottom: 16,
      position: "relative",
      zIndex: 1,
    }}>
      {chapter.icon}
    </div>

    {/* Subject */}
    <h3 style={{
      fontFamily: "Fraunces, Georgia, serif",
      fontSize: "clamp(18px,2.2vw,26px)",
      fontWeight: 900,
      color: INK,
      lineHeight: 1.15,
      marginBottom: 10,
      position: "relative",
      zIndex: 1,
    }}>
      {chapter.subject}
    </h3>

    {/* Tagline */}
    <p style={{
      fontFamily: "DM Serif Display, Georgia, serif",
      fontStyle: "italic",
      fontSize: "clamp(11px,1.3vw,14px)",
      color: chapter.color,
      marginBottom: 20,
      position: "relative",
      zIndex: 1,
      letterSpacing: "0.04em",
    }}>
      {chapter.tagline}
    </p>

    {/* Divider */}
    <div style={{
      width: 40,
      height: 2,
      background: `linear-gradient(90deg, ${chapter.color}, ${chapter.color}44)`,
      marginBottom: 20,
      borderRadius: 2,
      position: "relative",
      zIndex: 1,
    }}/>

    {/* Description */}
    <p style={{
      fontFamily: "Georgia, serif",
      fontSize: "clamp(11px,1.2vw,13px)",
      color: MUTE,
      lineHeight: 1.7,
      maxWidth: 260,
      position: "relative",
      zIndex: 1,
    }}>
      {chapter.description}
    </p>

    {/* Stats row */}
    <div style={{
      display: "flex",
      gap: 16,
      marginTop: 20,
      position: "relative",
      zIndex: 1,
    }}>
      {[chapter.duration, chapter.projects].map((stat, i) => (
        <div key={i} style={{
          background: chapter.color + "10",
          border: `1px solid ${chapter.color}28`,
          borderRadius: 8,
          padding: "6px 12px",
          textAlign: "center",
        }}>
          <span style={{
            fontFamily: "monospace",
            fontSize: "clamp(9px,1vw,11px)",
            color: chapter.color,
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}>
            {stat}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const RightPage = ({ chapter }) => (
  <div style={{
    width: "100%",
    height: "100%",
    background: SURF,
    padding: "clamp(24px,3vw,40px) clamp(20px,2.5vw,36px)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  }}>
    <PageLines color="#8C7F6E"/>

    {/* Chapter label */}
    <div style={{
      fontFamily: "monospace",
      fontSize: "clamp(9px,1vw,11px)",
      color: MUTE,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      marginBottom: 14,
      position: "relative",
      zIndex: 1,
    }}>
      Chapter {chapter.number} · Curriculum
    </div>

    {/* Section heading */}
    <h4 style={{
      fontFamily: "Fraunces, Georgia, serif",
      fontSize: "clamp(13px,1.5vw,16px)",
      fontWeight: 700,
      color: INK,
      marginBottom: 18,
      position: "relative",
      zIndex: 1,
      paddingBottom: 12,
      borderBottom: `1px solid ${BORD}`,
    }}>
      What you'll learn
    </h4>

    {/* Topic list */}
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 10,
      flex: 1,
      position: "relative",
      zIndex: 1,
    }}>
      {chapter.topics.map((topic, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: chapter.color,
            flexShrink: 0,
            opacity: 0.85,
          }}/>
          <span style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(11px,1.2vw,13.5px)",
            color: INK2,
            lineHeight: 1.4,
          }}>
            {topic}
          </span>
          {/* Dotted leader */}
          <div style={{
            flex: 1,
            borderBottom: `1px dotted ${BORD}`,
            marginBottom: 1,
          }}/>
          <span style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: LITE,
            flexShrink: 0,
          }}>
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div style={{
      borderTop: `1px solid ${BORD}`,
      paddingTop: 12,
      marginTop: 14,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    }}>
      <span style={{
        fontFamily: "monospace",
        fontSize: 10,
        color: MUTE,
        letterSpacing: "0.1em",
      }}>
        ESPERLY
      </span>
      <span style={{
        fontFamily: "Georgia, serif",
        fontSize: 11,
        color: MUTE,
        fontStyle: "italic",
      }}>
        pg. {chapter.number}
      </span>
    </div>
  </div>
);

const WhatWeTeach = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState("forward");
  const [flipAngle, setFlipAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const FLIP_MS = FLIP_DURATION * 1000;

  const count = chapters.length;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animateFlip = useCallback((targetAngle, onDone) => {
    const startAngle = flipAngle;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / FLIP_MS, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setFlipAngle(startAngle + (targetAngle - startAngle) * ease);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setFlipAngle(targetAngle);
        onDone();
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, [flipAngle, FLIP_MS]);

  const goNext = useCallback(() => {
    if (isFlipping) return;
    const nxt = (current + 1) % count;
    setNext(nxt);
    setFlipDir("forward");
    setFlipAngle(0);
    setIsFlipping(true);
    const startT = performance.now();
    const step = (now) => {
      const elapsed = now - startT;
      const t = Math.min(elapsed / FLIP_MS, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setFlipAngle(-180 * ease);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setFlipAngle(-180);
        setCurrent(nxt);
        setIsFlipping(false);
        setFlipAngle(0);
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, [isFlipping, current, count, FLIP_MS]);

  const goPrev = useCallback(() => {
    if (isFlipping) return;
    const prv = (current - 1 + count) % count;
    setNext(prv);
    setFlipDir("backward");
    setFlipAngle(0);
    setIsFlipping(true);
    const startT = performance.now();
    const step = (now) => {
      const elapsed = now - startT;
      const t = Math.min(elapsed / FLIP_MS, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setFlipAngle(180 * ease);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setFlipAngle(180);
        setCurrent(prv);
        setIsFlipping(false);
        setFlipAngle(0);
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  }, [isFlipping, current, count, FLIP_MS]);

  // Auto advance
  useEffect(() => {
    if (isMobile) return; // Disable auto-advance on mobile
    timerRef.current = setInterval(() => {
      goNext();
    }, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goNext, isMobile]);

  const resetTimer = () => {
    if (isMobile) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goNext(), AUTO_INTERVAL);
  };

  const handlePrev = () => { goPrev(); resetTimer(); };
  const handleNext = () => { goNext(); resetTimer(); };
  const handleDot = (i) => {
    if (i === current || isFlipping) return;
    if (i > current) { goNext(); } else { goPrev(); }
    resetTimer();
  };

  return (
    <section style={{
      background: BG,
      padding: "clamp(48px,7vw,96px) clamp(16px,4vw,60px)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Georgia, serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .book-scene { perspective: 2000px; }
        .book-wrap {
          position: relative;
          transform-style: preserve-3d;
        }
        .page-face {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0 4px 4px 0;
          overflow: hidden;
        }
        .page-face-back {
          transform: rotateY(180deg);
        }
        @keyframes pageShadowPulse {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.32; }
        }
      `}</style>

      {/* Background paper texture with new color theme */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 20% 50%, ${CR}08, transparent 60%),
                     radial-gradient(ellipse at 80% 20%, ${CR}06, transparent 50%)`,
        pointerEvents: "none",
      }}/>

      {/* Section header */}
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: "clamp(36px,5vw,60px)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 20, height: 2, background: CR }}/>
              <span style={{
                fontFamily: "monospace",
                fontSize: "clamp(10px,1.1vw,12px)",
                color: CR,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}>
                Curriculum
              </span>
            </div>
            <h2 style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(28px,4.5vw,54px)",
              fontWeight: 900,
              color: INK,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
            }}>
              What We<br/>
              <span style={{ color: CR, fontStyle: "italic" }}>Teach</span>
            </h2>
          </div>

          {/* Chapter counter */}
          <div style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(36px,5vw,60px)",
            fontWeight: 900,
            color: CR,
            opacity: 0.12,
            lineHeight: 1,
            userSelect: "none",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </div>

        {/* Render either Desktop or Mobile view */}
        {!isMobile ? (
          <DesktopBookView 
            current={current}
            next={next}
            isFlipping={isFlipping}
            flipDir={flipDir}
            flipAngle={flipAngle}
            chapters={chapters}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        ) : (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}>
            <div style={{
              width: "100%",
              maxWidth: "400px",
              height: "500px",
              margin: "0 auto",
              position: "relative",
            }}>
              <SinglePageView 
                chapter={chapters[current]}
                onNext={handleNext}
                onPrev={handlePrev}
                isFlipping={isFlipping}
              />
            </div>
          </div>
        )}

        {/* ── DOTS + PROGRESS ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          marginTop: isMobile ? 80 : 32,
        }}>
          {/* Chapter dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === current ? chapters[current].color : BORD,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.3s ease, background 0.3s ease",
                  outline: "none",
                }}
              />
            ))}
          </div>

          {/* Current chapter label */}
          <div style={{
            fontFamily: "monospace",
            fontSize: "clamp(9px,1vw,11px)",
            color: MUTE,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            {chapters[current].subject}
          </div>

          {/* Auto-play progress bar (only on desktop) */}
          {!isMobile && (
            <div style={{
              width: "clamp(120px,20vw,220px)",
              height: 2,
              background: BORD,
              borderRadius: 2,
              overflow: "hidden",
            }}>
              <motion.div
                key={current}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${chapters[current].color}, ${chapters[current].color}88)`,
                  borderRadius: 2,
                }}
              />
            </div>
          )}
        </div>

        {/* ── TRACK THUMBNAILS ── */}
        <div style={{
          display: "flex",
          gap: "clamp(8px,1.5vw,14px)",
          marginTop: "clamp(28px,4vw,44px)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {chapters.map((ch, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { handleDot(i); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: i === current ? ch.color + "14" : SURF,
                border: `1.5px solid ${i === current ? ch.color + "55" : BORD}`,
                borderRadius: 10,
                padding: "8px 14px",
                cursor: "pointer",
                outline: "none",
                transition: "background 0.25s, border-color 0.25s",
                boxShadow: i === current ? `0 4px 16px ${ch.color}18` : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 14, color: ch.color }}>{ch.icon}</span>
              <span style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "clamp(10px,1.1vw,12px)",
                fontWeight: i === current ? 700 : 500,
                color: i === current ? ch.color : MUTE,
                transition: "color 0.25s",
                whiteSpace: "nowrap",
              }}>
                {ch.subject}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeTeach;