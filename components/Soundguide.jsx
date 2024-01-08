// import ReactPlayer from "react-player";
import dynamic from "next/dynamic";

const DynamicReactPlayer = dynamic(() => import('react-player'), {ssr: false});

const Soundguide = ({videoUrl, volume, muted, playing, end, loop, ...props}) => {
    return (
    <DynamicReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        volume={volume}
        controls={false}
        muted={muted}
        playing={playing}
        loop={loop}
        onEnded={end}
        config={{
            file: {
              attributes: {
                preload: 'auto',
              },
            },
          }}
        {...props}
    />
    )
};

export default Soundguide;