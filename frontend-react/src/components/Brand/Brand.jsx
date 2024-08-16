import { images } from "../../constants";
import propTypes from "prop-types";
const Brand = ({ className = "" }) => {
  return (
    <div
      className={`title d-flex align-items-center justify-content-center gap-2 ${className}`}
    >
      <img
        src={images.LOGO}
        width={40}
        height={40}
        alt="LOGO"
        className="LOGO"
      />
      <h4 className="m-0 h4">𝐼𝓃𝓈𝓉𝑒𝑔𝓇𝒶𝓂</h4>
    </div>
  );
};

Brand.propTypes = {
  className: propTypes.string,
};

export default Brand;
