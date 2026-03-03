import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiAward, FiBookOpen, FiTarget } from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="relative overflow-hidden">

      {/* ================= HERO PARALLAX SECTION ================= */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white">

        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl px-6"
        >
          <span className="px-4 py-2 bg-red-500/20 border border-red-400 rounded-full text-red-300 text-sm font-semibold tracking-wide backdrop-blur-md">
            ABOUT ESPERLY
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Shaping Futures Through
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Quality Tuition
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Esperly empowers students with structured guidance,
            expert educators, and modern learning techniques.
          </p>
        </motion.div>
      </section>


      {/* ================= CONTENT SECTION ================= */}
      <section className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-red-900 mb-6">
                Our Mission
              </h2>
              <p className="text-red-700/80 leading-relaxed text-lg">
                Our mission is to provide personalized and effective tuition
                that builds confidence, strengthens fundamentals,
                and prepares students for academic excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-lg border border-red-100 rounded-3xl p-10 shadow-xl"
            >
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <FiTarget className="text-red-600" size={24} />
                  <span className="text-red-900 font-semibold">
                    Personalized Learning Plans
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <FiBookOpen className="text-red-600" size={24} />
                  <span className="text-red-900 font-semibold">
                    Structured Curriculum
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <FiAward className="text-red-600" size={24} />
                  <span className="text-red-900 font-semibold">
                    Certified & Experienced Tutors
                  </span>
                </li>
              </ul>
            </motion.div>

          </div>


          {/* ================= STATS STRIP ================= */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiUsers, label: "10,000+ Students" },
              { icon: FiBookOpen, label: "500+ Courses" },
              { icon: FiAward, label: "Top Rated Tutors" },
              { icon: FiTarget, label: "95% Success Rate" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100 hover:shadow-xl transition-all"
                >
                  <Icon className="mx-auto text-red-600 mb-4" size={28} />
                  <p className="font-semibold text-red-900">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;