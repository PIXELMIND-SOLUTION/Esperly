import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919876543210"; // replace with your number
  const message = "Hi! I'm interested in your services.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 group">

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        Connect with us
      </div>

      {/* Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping"></span>

        {/* Icon */}
        <FaWhatsapp className="text-2xl relative z-10" />
      </a>

    </div>
  );
};

export default WhatsAppButton;