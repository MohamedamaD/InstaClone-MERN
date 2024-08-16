import PropTypes from "prop-types";
const AuthHeading = ({ title, paragraph }) => {
  return (
    <div className="text-container text-center">
      <h2>{title}</h2>
      <p className="text-secondary text-capitalize fw-medium">{paragraph}</p>
    </div>
  );
};

AuthHeading.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default AuthHeading;
