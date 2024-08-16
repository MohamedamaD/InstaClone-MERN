import { useInView } from "react-intersection-observer";
import propTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
const Video = ({ src, alt }) => {
  const { ref: inViewRef, inView } = useInView();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const handleMuteToggle = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);
  const setRefs = useCallback(
    (node) => {
      videoRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (videoRef) {
      inView ? videoRef.current.play() : videoRef.current.pause();
    }
    return () => {};
  }, [videoRef, inView]);

  return (
    <div className="position-relative h-100">
      <video
        ref={setRefs}
        className="d-block w-100 object-fit-cover img-fluid"
        src={src}
        alt={alt}
        style={{ height: 350 }}
        muted={isMuted}
        autoPlay
        loop
        playsInline
      />
      <button
        onClick={handleMuteToggle}
        className="position-absolute pointer rounded-circle p-2 d-flex align-items-center justify-content-center"
        style={{
          bottom: 10,
          right: 10,
          width: "30px",
          height: "30px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
        }}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};
Video.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
};
export default Video;
