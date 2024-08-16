import { Spinner } from "react-bootstrap";
import propTypes from "prop-types";
const Loader = ({ variant, size }) => {
  return (
    <div className="loader">
      <Spinner
        className="m-auto"
        size={size}
        variant={variant}
        animation="border"
        role="status"
      />
    </div>
  );
};
Loader.propTypes = {
  variant: propTypes.string,
  size: propTypes.string,
};
export default Loader;
