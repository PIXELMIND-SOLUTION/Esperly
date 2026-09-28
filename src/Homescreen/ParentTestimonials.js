import React from "react";
import ParentImage from "../assets/parent.png";
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
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <h2
            id="parent-testimonials-heading"
            className="text-center text-2xl font-semibold leading-tight text-[#F0625D] sm:text-3xl lg:text-[34px]"
          >
            “From improved grades to greater confidence…”
          </h2>

          <p className="mt-5 max-w-[520px] text-left text-base leading-relaxed text-black sm:mt-6 sm:text-lg lg:text-xl">
            From improved grades to greater confidence, see how Esperly is
            making a positive impact on students and families.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 lg:gap-6">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="mx-auto flex w-full max-w-md flex-col rounded-2xl bg-[#FDE0DD] px-5 pb-6 pt-6 md:max-w-none lg:px-7"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="mx-auto h-[100px] w-[100px] rounded-2xl object-cover sm:h-[106px] sm:w-[106px]"
              />

              <div className="mt-5">
                <Stars />
              </div>

              <p className="mt-4 flex-1 text-left text-[13px] leading-[1.7] text-[#1a1a1a] sm:text-sm">
                “{item.text}”
              </p>

              <p className="mt-6 flex items-center justify-end gap-2 text-base font-normal text-black sm:text-lg lg:text-xl">
                <span aria-hidden="true">•</span>
                {item.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParentTestimonials;