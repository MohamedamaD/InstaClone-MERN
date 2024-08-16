import PropTypes from "prop-types";

const CustomButton = ({ children }) => {
  return (
    <button className="btn custom-button text-body d-flex align-items-center justify-content-center fw-medium gap-2 fs-6">
      {children}
    </button>
  );
};
CustomButton.propTypes = {
  children: PropTypes.node,
};

export default CustomButton;
