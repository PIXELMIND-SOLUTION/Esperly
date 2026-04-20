import meet from "../assets/meet.mp4";

const MeetVideo = () => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <video
          src={meet}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="
            w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[400px] 
            lg:h-[500px] 
            xl:h-[600px]
            object-cover 
          "
        />
      </div>
    </div>
  );
};

export default MeetVideo;