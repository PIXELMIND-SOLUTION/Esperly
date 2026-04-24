export default function TuitionBackground({ children }) {
  return (
    <div
      className="relative w-full min-h-screen"
      style={{
        backgroundColor: "#fff",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {children}
    </div>
  );
}