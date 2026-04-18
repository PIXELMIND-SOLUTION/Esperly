import { useState, useEffect, useRef } from "react";

function GraduationCapIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  );
}

export default function AnnouncementBanner() {
  const fullText = "Mentorship is Now Available";
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);
  const isDeleting = useRef(false);

  // Viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Fixed loop typing logic using refs to avoid stale closure bugs
  useEffect(() => {
    if (!startTyping) return;

    const type = () => {
      if (!isDeleting.current) {
        // Typing forward
        if (indexRef.current < fullText.length) {
          setTypedText(fullText.slice(0, indexRef.current + 1));
          indexRef.current += 1;
          timeoutRef.current = setTimeout(type, 40);
        } else {
          // Finished typing — wait 2s then start clearing
          timeoutRef.current = setTimeout(() => {
            isDeleting.current = true;
            type();
          }, 2000);
        }
      } else {
        // Deleting
        if (indexRef.current > 0) {
          indexRef.current -= 1;
          setTypedText(fullText.slice(0, indexRef.current));
          timeoutRef.current = setTimeout(type, 20);
        } else {
          // Done deleting — restart
          isDeleting.current = false;
          timeoutRef.current = setTimeout(type, 300);
        }
      }
    };

    type();

    return () => clearTimeout(timeoutRef.current);
  }, [startTyping]);

  return (
    <div
      ref={ref}
      className="
        w-full relative overflow-hidden
        bg-[#0d0405]
        flex flex-col md:flex-row items-center justify-between
        gap-6 md:gap-10
        px-4 sm:px-6 md:px-10 lg:px-14
        py-6 sm:py-8 md:py-10
        text-center md:text-left
      "
    >
      {/* LEFT */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

        {/* Icon */}
        <div className="flex flex-col items-center gap-2 animate-[float_3.5s_ease-in-out_infinite]">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#EB66641a] border border-[#EB66644d] flex items-center justify-center">
            <GraduationCapIcon className="text-[#EB6664] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </div>

          <div className="flex items-center gap-1">
            <span className="relative w-2 h-2 flex">
              <span className="absolute inset-0 rounded-full bg-[#EB6664] opacity-70 animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-[#EB6664]" />
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#EB6664]">
              Live
            </span>
          </div>
        </div>

        {/* Typing Text */}
        <div className="text-white font-extrabold leading-tight
                        text-lg sm:text-xl md:text-2xl lg:text-3xl">
          <span className="text-[#EB6664]">1-on-1 </span>
          {typedText}
          <span className="border-r-2 border-white ml-1 animate-pulse" />
        </div>
      </div>

      {/* CTA */}
      <button
        className="
          flex items-center gap-2 shrink-0
          bg-[#EB6664] text-white font-bold
          text-xs sm:text-sm
          px-4 sm:px-5 md:px-6
          py-2.5 sm:py-3
          rounded-lg
          transition-all duration-200
          hover:bg-[#d95250] hover:scale-105
        "
      >
        Book a Session
      </button>

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}




// import { useState, useEffect, useRef } from "react";

// function GraduationCapIcon({ className }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className={className}
//     >
//       <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
//     </svg>
//   );
// }

// export default function AnnouncementBanner() {
//   const fullText = "Mentorship is Now Available";
//   const [typedText, setTypedText] = useState("");
//   const [startTyping, setStartTyping] = useState(false);
//   const ref = useRef(null);
//   const timeoutRef = useRef(null);
//   const indexRef = useRef(0);
//   const isDeleting = useRef(false);

//   // Viewport detection
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStartTyping(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.4 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   // Fixed loop typing logic using refs to avoid stale closure bugs
//   useEffect(() => {
//     if (!startTyping) return;

//     const type = () => {
//       if (!isDeleting.current) {
//         // Typing forward
//         if (indexRef.current < fullText.length) {
//           setTypedText(fullText.slice(0, indexRef.current + 1));
//           indexRef.current += 1;
//           timeoutRef.current = setTimeout(type, 40);
//         } else {
//           // Finished typing — wait 2s then start clearing
//           timeoutRef.current = setTimeout(() => {
//             isDeleting.current = true;
//             type();
//           }, 2000);
//         }
//       } else {
//         // Deleting
//         if (indexRef.current > 0) {
//           indexRef.current -= 1;
//           setTypedText(fullText.slice(0, indexRef.current));
//           timeoutRef.current = setTimeout(type, 20);
//         } else {
//           // Done deleting — restart
//           isDeleting.current = false;
//           timeoutRef.current = setTimeout(type, 300);
//         }
//       }
//     };

//     type();

//     return () => clearTimeout(timeoutRef.current);
//   }, [startTyping]);

//   return (
//     <div
//       ref={ref}
//       className="
//         w-full relative overflow-hidden
//         bg-[#0d0405]
//         flex flex-col md:flex-row items-center justify-between
//         gap-6 md:gap-10
//         px-4 sm:px-6 md:px-10 lg:px-14
//         py-6 sm:py-8 md:py-10
//         text-center md:text-left
//       "
//     >
//       {/* LEFT */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

//         {/* Icon */}
//         <div className="flex flex-col items-center gap-2 animate-[float_3.5s_ease-in-out_infinite]">
//           <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#EB66641a] border border-[#EB66644d] flex items-center justify-center">
//             <GraduationCapIcon className="text-[#EB6664] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//           </div>

//           <div className="flex items-center gap-1">
//             <span className="relative w-2 h-2 flex">
//               <span className="absolute inset-0 rounded-full bg-[#EB6664] opacity-70 animate-ping" />
//               <span className="relative w-2 h-2 rounded-full bg-[#EB6664]" />
//             </span>
//             <span className="text-[10px] font-bold tracking-widest uppercase text-[#EB6664]">
//               Live
//             </span>
//           </div>
//         </div>

//         {/* Typing Text */}
//         <div className="text-white font-extrabold leading-tight
//                         text-lg sm:text-xl md:text-2xl lg:text-3xl">
//           <span className="text-[#EB6664]">1-on-1 </span>
//           {(() => {
//             const colorStart = fullText.indexOf("Available");
//             if (colorStart === -1 || typedText.length <= colorStart) {
//               return <span>{typedText}</span>;
//             }
//             return (
//               <>
//                 <span>{typedText.slice(0, colorStart)}</span>
//                 <span className="text-[#EB6664]">{typedText.slice(colorStart)}</span>
//               </>
//             );
//           })()}
//           <span className="border-r-2 border-white ml-1 animate-pulse" />
//         </div>
//       </div>

//       {/* CTA */}
//       <button
//         className="
//           flex items-center gap-2 shrink-0
//           bg-[#EB6664] text-white font-bold
//           text-xs sm:text-sm
//           px-4 sm:px-5 md:px-6
//           py-2.5 sm:py-3
//           rounded-lg
//           transition-all duration-200
//           hover:bg-[#d95250] hover:scale-105
//         "
//       >
//         Book a Session
//       </button>

//       {/* Float animation */}
//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-4px); }
//         }
//       `}</style>
//     </div>
//   );
// }