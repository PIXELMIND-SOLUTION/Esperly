import React from "react";
import ParentImage from "../assets/parent.png";
import { BsQuote } from "react-icons/bs";
const testimonials = [
  {
    id: 1,
    name: "Sunil Reddy",
    image: ParentImage,
    text: "Esperly has helped my child become more confident and focused in studies. The personalized attention from mentors has made a remarkable difference in academic performance.",
  },
  {
    id: 2,
    name: "Neha Gupta",
    image: ParentImage,
    text: "The regular progress updates and one-on-one guidance have given us complete confidence in our child's learning journey. We truly appreciate the support from the Esperly team.",
  },
  {
    id: 3,
    name: "Rajesh Nanda",
    image: ParentImage,
    text: "What stands out most is the way mentors understand each student's needs. The learning experience feels personal, engaging, and highly effective.",
  },
];

const Star = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    aria-hidden="true"
  >
    <path
      d="M12 2.5l2.94 6.09 6.56.9-4.8 4.6 1.2 6.6L12 17.55 6.1 20.7l1.2-6.6-4.8-4.6 6.56-.9L12 2.5z"
      fill="#FFC928"
      stroke="#F59E0B"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const Stars = () => (
  <div
    className="flex items-center justify-center gap-0.5"
    role="img"
    aria-label="Rated 5 out of 5 stars"
  >
    {[...Array(5)].map((_, i) => (
      <Star key={i} />
    ))}
  </div>
);

const ParentTestimonials = () => {
  return (
    <section
      className="w-full bg-[#fdf1e9] px-4 py-10 font-['Poppins',sans-serif] sm:px-8 sm:py-14 lg:px-16 lg:py-16"
      aria-labelledby="parent-testimonials-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <h2
            id="parent-testimonials-heading"
            className="text-center text-2xl font-semibold leading-tight text-[#F0625D] sm:text-3xl lg:text-[34px]"
          >
            “From improved grades to greater confidence…”
          </h2>

          <p className="mt-5 max-w-7xl text-left text-base leading-relaxed text-black sm:mt-6 sm:text-lg lg:text-xl">
            From improved grades to greater confidence, see how Esperly is
            making a positive impact on students and families.
          </p>
        </div>


        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 lg:gap-6">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="group mx-auto flex w-full max-w-md flex-col rounded-2xl border border-[#EB6664]/20
                 bg-[#FDE0DD] p-5 shadow-sm transition-all duration-300
                 hover:-translate-y-1 hover:shadow-lg sm:p-6 md:max-w-none"
            >
              {/* Top row: quote badge + rating */}
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EB6664] text-white">
                  <BsQuote className="h-6 w-6" aria-hidden="true" />
                </span>
                <Stars rating={item.rating ?? 5} />
              </div>

              {/* Quote */}
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-black/80 sm:text-[15px]">
                “{item.text}”
              </blockquote>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-[#EB6664]/20 pt-4">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white sm:h-14 sm:w-14"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-black sm:text-base">
                    {item.name}
                  </p>
                  {item.role && (
                    <p className="truncate text-xs text-black/60 sm:text-sm">
                      {item.role}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParentTestimonials;