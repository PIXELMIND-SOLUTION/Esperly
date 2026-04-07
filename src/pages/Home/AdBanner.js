import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   ICON SYSTEM (CLEAN LINE ICONS)
───────────────────────────────────────────── */

const Ic = ({ children, className = "w-5 h-5", strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    className={className}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const ArrowLeftIcon = ({ c }) => (
  <Ic className={c}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </Ic>
);

const ArrowRightIcon = ({ c }) => (
  <Ic className={c}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Ic>
);

/* ─────────────────────────────────────────────
   PROMOTION BANNERS
───────────────────────────────────────────── */

const PROMO_BANNERS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1400",
    title: "Mega Sale is Live",
    subtitle: "Up to 70% OFF on all courses",
    cta: "Shop Now",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400",
    title: "Learn Coding Faster",
    subtitle: "Join 1M+ students worldwide",
    cta: "Start Learning",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400",
    title: "Boost Your Career",
    subtitle: "Top skills for 2026",
    cta: "Explore Now",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function PromotionsBanner() {
  const [cur, setCur] = useState(0);

  // Auto slide
  useEffect(() => {
    const t = setInterval(() => {
      setCur((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 4000);

    return () => clearInterval(t);
  }, []);

  const next = () =>
    setCur((prev) => (prev + 1) % PROMO_BANNERS.length);

  const prev = () =>
    setCur((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);

  const banner = PROMO_BANNERS[cur];

  return (
    <section className="w-full py-10 bg-[#fef9f0]">

      {/* BANNER */}
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="relative w-full h-[220px] md:h-[320px] rounded-0 overflow-hidden shadow-lg">

          {/* IMAGE */}
          <img
            src={banner.image}
            className="w-full h-full object-cover"
            alt={banner.title}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 md:px-12">
            <h3 className="text-white text-xl md:text-3xl font-bold mb-2">
              {banner.title}
            </h3>

            <p className="text-white/90 text-sm md:text-lg mb-4">
              {banner.subtitle}
            </p>

            <button className="bg-white text-black px-5 py-2 rounded-full w-fit font-semibold hover:scale-105 transition">
              {banner.cta}
            </button>
          </div>
        </div>

        {/* ARROWS (UPDATED) */}
        <button
          onClick={prev}
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            bg-white/20 backdrop-blur-md border border-white/30
            p-2 rounded-full shadow-md
            hover:scale-110 transition
          "
        >
          <ArrowLeftIcon c="w-5 h-5 text-white" />
        </button>

        <button
          onClick={next}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            bg-white/20 backdrop-blur-md border border-white/30
            p-2 rounded-full shadow-md
            hover:scale-110 transition
          "
        >
          <ArrowRightIcon c="w-5 h-5 text-white" />
        </button>

        {/* DOTS */}
        <div className="flex justify-center mt-4 gap-2">
          {PROMO_BANNERS.map((_, i) => (
            <div
              key={i}
              onClick={() => setCur(i)}
              className={`h-2 rounded-full cursor-pointer transition-all ${i === cur ? "w-6 bg-black" : "w-2 bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}