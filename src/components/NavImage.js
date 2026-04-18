const NavImage = () => {
  return (
    <div className="relative w-full">

      {/* Hanging Wave */}
      <div className="absolute left-0 top-full w-full pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[50px] sm:h-[70px] md:h-[90px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 
               C300,100 900,0 1440,60 
               L1440,0 
               L0,0 Z"
            fill="#EB6664"
          />
        </svg>
      </div>

    </div>
  );
};

export default NavImage;