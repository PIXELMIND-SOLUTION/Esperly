const StepsImage = () => {

    const Highlight = ({ children, color = "#FFEB3B" }) => (
        <span
            style={{
                background: `linear-gradient(180deg, transparent 40%, ${color}88 40%)`,
                paddingBottom: 2,
            }}
        >
            {children}
        </span>
    );
    return (
        <div className="w-full bg-[#FBF7F2] flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">

            {/* Heading */}
            <h2 className="text-center font-semibold text-gray-800 
                     text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                     mb-6 sm:mb-8 md:mb-10">
                <Highlight color="#FFEB3B">
                    <span style={{ color: "#EB6664", fontStyle: "italic" }}>Esperly’s</span>
                </Highlight> Structured Onboarding Journey
            </h2>

            {/* Image */}
            <div className="w-full max-w-5xl">
                <img
                    src="/step.png"
                    alt="Onboarding Journey"
                    className="w-full h-auto object-contain"
                />
            </div>

        </div>
    );
};

export default StepsImage;