
const Docent = ({ videoUrl, volume, muted, playing, end, loop, ...props }) => {
    return (
      <video
        className="absolute h-[150px] w-[150px] transform -translate-x-1/2 left-1/2 bottom-0"
        playsInline
        // width="50%"
        // height="50%"
        volume={volume}
        controls={false}
        muted={muted}
        autoPlay={playing}  // Use autoPlay instead of playing for native video element
        loop={loop}
        onEnded={end}
        style={{ objectFit: 'cover' }}  // Adjust styling as needed
        {...props}
      >
        <source src={videoUrl} type="video/webm" />
        {/* Add additional source elements for different video formats if needed */}
      </video>
    );
  };
  
  export default Docent;