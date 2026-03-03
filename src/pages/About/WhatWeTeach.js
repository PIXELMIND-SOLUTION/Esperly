import React from "react";

const subjectsTop = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "Economics",
  "Statistics",
];

const subjectsBottom = [
  "Accountancy",
  "Business Studies",
  "History",
  "Geography",
  "Political Science",
  "Competitive Exams",
  "Coding for Kids",
  "Spoken English",
];

const WhatWeTeach = () => {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-white">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-2 bg-red-500/20 border border-red-400 rounded-full text-red-300 text-sm font-semibold tracking-wide backdrop-blur-md">
            WHAT WE TEACH
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl font-bold">
            Subjects Designed for
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            From core academics to competitive preparation,
            Esperly ensures complete learning support.
          </p>
        </div>

        {/* ====== SCROLL ROW 1 (Right) ====== */}
        <div className="overflow-hidden mb-10">
          <div className="flex gap-6 animate-scroll-right w-max">
            {[...subjectsTop, ...subjectsTop].map((subject, index) => (
              <div
                key={index}
                className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-red-300 font-semibold text-lg shadow-xl whitespace-nowrap hover:scale-105 transition-transform"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>

        {/* ====== SCROLL ROW 2 (Left) ====== */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll-left w-max">
            {[...subjectsBottom, ...subjectsBottom].map((subject, index) => (
              <div
                key={index}
                className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-red-300 font-semibold text-lg shadow-xl whitespace-nowrap hover:scale-105 transition-transform"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeTeach;