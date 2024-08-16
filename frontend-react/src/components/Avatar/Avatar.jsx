import { images } from "../../constants";
import propTypes from "prop-types";

const Avatar = ({ src, alt, width, height }) => {
  return (
    <img
      src={src ?? images.PROFILE_DEFAULT}
      className="rounded-circle object-fit-cover"
      width={width ?? 50}
      height={height ?? 50}
      alt={alt}
      style={{ border: "2px solid white" }}
    />
  );
};

Avatar.propTypes = {
  src: propTypes.string,
  alt: propTypes.string.isRequired,
  width: propTypes.number,
  height: propTypes.number,
};

export default Avatar;
