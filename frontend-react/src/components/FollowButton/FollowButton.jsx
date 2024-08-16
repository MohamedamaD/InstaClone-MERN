import propTypes from "prop-types";
import {
  useFollowUser,
  useIsFollowingUser,
  useUnFollowUser,
} from "../../hooks/Query";
import Loader from "../Loader/Loader";

const FollowButton = ({ to, className }) => {
  const { data: isFollowing } = useIsFollowingUser(to);
  return (
    <div
      className={`fw-bold link-primary ${className}`}
      role="button"
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      }}
    >
      {isFollowing ? <UnFollow to={to} /> : <Follow to={to} />}
    </div>
  );
};

function UnFollow({ to }) {
  const { mutate, isPending } = useUnFollowUser(to);
  if (isPending) return <Loader />;
  return (
    <span title="un follow" onClick={() => mutate()}>
      unFollow
    </span>
  );
}

function Follow({ to }) {
  const { mutate, isPending } = useFollowUser(to);
  if (isPending) return <Loader />;

  return (
    <span title="follow" onClick={() => mutate()}>
      follow
    </span>
  );
}

FollowButton.propTypes = {
  to: propTypes.number.isRequired,
  className: propTypes.string,
};
UnFollow.propTypes = {
  to: propTypes.number.isRequired,
};
Follow.propTypes = {
  to: propTypes.number.isRequired,
};

export default FollowButton;
