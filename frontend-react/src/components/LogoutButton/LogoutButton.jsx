import { useLogout } from "../../hooks";
import { CiLogout } from "react-icons/ci";
import PropTypes from "prop-types";

const LogoutButton = ({ children }) => {
  const { mutate } = useLogout();

  return (
    <button
      className="btn btn-outline-danger d-flex align-items-center gap-2"
      onClick={mutate}
      aria-label="Logout"
    >
      <CiLogout size={25} />
      {children}
    </button>
  );
};

LogoutButton.propTypes = {
  children: PropTypes.node,
};

export default LogoutButton;
