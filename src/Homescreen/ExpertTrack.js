// import React, { useRef } from "react";
// import { motion, useInView } from "motion/react";

// /* ─── ANIMATION WRAPPERS ─────────────────────────────────────── */
// const SlideIn = ({ children, from = "left", delay = 0, className = "" }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-6% 0px" });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: from === "left" ? -48 : 48 }}
//       animate={inView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const FadeUp = ({ children, delay = 0, className = "" }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-6% 0px" });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 32 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// /* ─── SHARED PRIMITIVES ─────────────────────────────────────── */
// const ScribbleUnderline = ({ color = "#EB6664", widthClass = "w-52" }) => (
//   <svg
//     viewBox="0 0 200 12"
//     preserveAspectRatio="none"
//     className={`${widthClass} h-3 block mb-5`}
//   >
//     <path
//       d="M2 8 C30 4, 60 11, 100 7 C140 3, 170 10, 198 6"
//       stroke={color}
//       strokeWidth="2.5"
//       fill="none"
//       strokeLinecap="round"
//     />
//   </svg>
// );

// const Highlight = ({ children, colorClass = "from-transparent via-transparent to-yellow-200" }) => (
//   <span
//     className="relative inline"
//     style={{
//       background: "linear-gradient(180deg, transparent 40%, #C8E6C988 40%)",
//       paddingBottom: 2,
//     }}
//   >
//     {children}
//   </span>
// );

// const HighlightBlue = ({ children }) => (
//   <span
//     style={{
//       background: "linear-gradient(180deg, transparent 40%, #B3E5FC88 40%)",
//       paddingBottom: 2,
//     }}
//   >
//     {children}
//   </span>
// );

// /* ═══════════════════════════════════════════════════════════════
//    SECTION 1 — TRUSTED SECTION
// ═══════════════════════════════════════════════════════════════ */
// export function TrustedSection() {
//   return (
//     <section
//       className="relative overflow-hidden font-sans"
//       style={{ background: "transparent", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)" }}
//     >
//       {/* Glow blobs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div
//           className="absolute w-80 h-80 rounded-full"
//           style={{
//             filter: "blur(80px)",
//             background: "radial-gradient(circle, #2E7D5214, transparent)",
//             top: "-8%",
//             left: "-4%",
//           }}
//         />
//         <div
//           className="absolute w-60 h-60 rounded-full"
//           style={{
//             filter: "blur(70px)",
//             background: "radial-gradient(circle, #3B6FA012, transparent)",
//             bottom: "-5%",
//             right: "10%",
//           }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto relative z-[2]">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16 items-center">

//           {/* Left — heading + description */}
//           <SlideIn from="left">
//             <h2
//               className="font-black leading-[1.05] tracking-tight mb-1.5"
//               style={{
//                 fontFamily: "Fraunces, Georgia, serif",
//                 fontSize: "clamp(22px,4vw,42px)",
//                 color: "#1C1209",
//               }}
//             >
//               Trusted by <span className="italic" style={{ color: "#EB6664" }}>Teachers & Parents</span>
//             </h2>

//             <ScribbleUnderline color="#EB6664" widthClass="w-[clamp(140px,20vw,260px)]" />

//             <p
//               className="leading-[1.8] mb-8"
//               style={{
//                 fontFamily: "DM Serif Display, Georgia, serif",
//                 fontSize: "clamp(15px,1.3vw,18px)",
//                 color: "#7A6E5A",
//                 maxWidth: 480,
//               }}
//             >
//               <Highlight> Trusted by families and educators alike, Esperly delivers a learning experience that truly
//                 makes a difference. Our personalized approach, expert mentors, and consistent results have
//                 earned the confidence of parents and teachers who want the{" "}
//                 best for every child.</Highlight>
//             </p>
//           </SlideIn>

//           {/* Right — hero image */}
//           <SlideIn from="right" delay={0.12}>
//             <FadeUp delay={0.15}>
//               <div
//                 className="w-full rounded-md overflow-hidden relative border border-dashed border-[#D6CEBA]"
//                 style={{
//                   aspectRatio: "4/3",
//                   background: "linear-gradient(135deg, #2E7D5220, #EDE3CC)",
//                   boxShadow: "2px 6px 24px rgba(0,0,0,0.07)",
//                 }}
//               >
//                 <img
//                   src="/student1.png"
//                   alt="Happy student with parent and teacher"
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.target.style.display = "none"; }}
//                 />
//               </div>
//             </FadeUp>
//           </SlideIn>

//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    SECTION 2 — SUPPORT SECTION
// ═══════════════════════════════════════════════════════════════ */
// export function SupportSection() {
//   return (
//     <section
//       className="relative overflow-hidden font-sans"
//       style={{ background: "transparent", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)" }}
//     >
//       {/* Glow blobs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div
//           className="absolute w-[300px] h-[300px] rounded-full"
//           style={{
//             filter: "blur(80px)",
//             background: "radial-gradient(circle, #3B6FA014, transparent)",
//             top: "-5%",
//             right: "-4%",
//           }}
//         />
//         <div
//           className="absolute w-[220px] h-[220px] rounded-full"
//           style={{
//             filter: "blur(60px)",
//             background: "radial-gradient(circle, #EB666410, transparent)",
//             bottom: "0%",
//             left: "20%",
//           }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto relative z-[2]">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16 items-center">

//           {/* Left — image */}
//           <SlideIn from="left" delay={0.12}>
//             <FadeUp delay={0.15}>
//               <div
//                 className="w-full rounded overflow-hidden relative border border-dashed border-[#D6CEBA]"
//                 style={{
//                   aspectRatio: "4/3",
//                   background: "linear-gradient(135deg, #3B6FA018, #EDE3CC)",
//                   boxShadow: "2px 4px 18px rgba(0,0,0,0.06)",
//                 }}
//               >
//                 <img
//                   src="/student2.png"
//                   alt="Friendly support team guiding a student"
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.target.style.display = "none"; }}
//                 />
//               </div>
//             </FadeUp>
//           </SlideIn>

//           {/* Right — heading + description */}
//           <SlideIn from="right">
//             <h2
//               className="font-black leading-[1.05] tracking-tight mb-1.5"
//               style={{
//                 fontFamily: "Fraunces, Georgia, serif",
//                 fontSize: "clamp(22px,4vw,42px)",
//                 color: "#1C1209",
//               }}
//             >
//               Support from <span className="italic" style={{ color: "#EB6664" }}>Our Team</span>
//             </h2>

//             <ScribbleUnderline color="#EB6664" widthClass="w-[clamp(120px,16vw,200px)]" />

//             <p
//               className="leading-[1.8]"
//               style={{
//                 fontFamily: "DM Serif Display, Georgia, serif",
//                 fontSize: "clamp(15px,1.3vw,18px)",
//                 color: "#7A6E5A",
//                 maxWidth: 480,
//                 marginBottom: "clamp(20px,3vw,36px)",
//               }}
//             >
//               <HighlightBlue>At Esperly, you're never alone in the learning journey. Our dedicated support team is always
//               ready to assist with guidance, queries, and continuous encouragement—ensuring a{" "}
//               smooth and stress-free experience
//               {" "}for both students and parents.</HighlightBlue>
//             </p>
//           </SlideIn>

//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════ */
// export default function TrustAndSupport() {
//   return (
//     <>
//       <TrustedSection />
//       <SupportSection />
//     </>
//   );
// }





import React from "react";
import { ShieldCheck, BarChart3, Target, Handshake } from "lucide-react";
import COMMUNITY_IMAGE from "../assets/trust.png";
import SUPPORT_IMAGE from "../assets/support.png";

const features = [
  { id: 1, label: "Safe Learning Space", Icon: ShieldCheck },
  { id: 2, label: "Weekly Progress Reports", Icon: BarChart3 },
  { id: 3, label: "Parent–Teacher Collaboration", Icon: Target },
  { id: 4, label: "Goal-Oriented Learning", Icon: Handshake },
];

const Pill = ({ children }) => (
  <span className="inline-block rounded-full bg-[#FDE0DD] px-4 py-1.5 text-sm font-normal text-[#F0625D] sm:text-base">
    {children}
  </span>
);

const TrustSupport = () => {
  return (
    <section className="w-full bg-[#fdf1e9] px-4 py-10 font-['Poppins',sans-serif] sm:px-8 sm:py-14 lg:px-16 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 lg:gap-16">
        {/* ---------- Our Community ---------- */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start">
            <Pill>Our Community</Pill>

            <h2 className="mt-5 text-2xl font-semibold leading-tight text-black sm:text-3xl lg:text-[32px]">
              Trusted by <span className="text-[#F0625D]">Teachers &amp; Parents</span>
            </h2>

            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-[#111] sm:text-lg lg:text-xl lg:leading-[1.55]">
              Every student&apos;s journey is supported by experienced mentors,
              personalized learning, and a community that truly cares.
              That&apos;s why parents and educators choose Esperly as a trusted
              partner in academic success.
            </p>

            <ul className="mt-6 grid w-full max-w-[520px] grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
              {features.map(({ id, label, Icon }) => (
                <li key={id} className="flex flex-col items-center text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0625D] text-white sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="mt-2 text-[13px] leading-snug text-[#111]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={COMMUNITY_IMAGE}
              alt="Mentor and parent helping a student study together"
              loading="lazy"
              className="w-full max-w-[460px] rounded-2xl object-cover lg:max-w-[440px]"
            />
          </div>
        </div>

        {/* ---------- Our Support ---------- */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* On mobile the text comes first, image second (matches reading order) */}
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <img
              src={SUPPORT_IMAGE}
              alt="Support team member guiding a student online"
              loading="lazy"
              className="w-full max-w-[460px] rounded-2xl object-cover lg:max-w-[440px]"
            />
          </div>

          <div className="order-1 flex flex-col items-start lg:order-2">
            <Pill>Our Support</Pill>

            <h2 className="mt-5 text-2xl font-semibold leading-tight text-black sm:text-3xl lg:text-[32px]">
              <span className="text-[#F0625D]">Support</span> from Our Team
            </h2>

            <p className="mt-5 max-w-[500px] text-base leading-relaxed text-[#111] sm:text-lg lg:text-xl lg:leading-[1.55]">
              From answering questions to tracking progress, our team provides
              continuous guidance and support to help every student stay
              confident, motivated, and on the path to success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSupport;