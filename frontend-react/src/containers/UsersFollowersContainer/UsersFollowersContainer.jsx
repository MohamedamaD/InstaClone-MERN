import { IoMdClose } from "react-icons/io";
import propTypes from "prop-types";
import { Avatar, FollowButton } from "../../components";
import { Link } from "react-router-dom";
const UsersFollowersContainer = ({ users, onClose, title }) => {
  return (
    <div className="position-fixed top-0 start-0 w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="overlay pointer" title="close" onClick={onClose}></div>
      <div className="rounded bg-body position-relative">
        <div
          className="d-flex align-items-center border-bottom p-2"
          style={{ width: 350 }}
        >
          <p className="m-0 flex-fill text-center fw-medium">{title}</p>
          <IoMdClose
            size={25}
            className="pointer"
            title="close"
            onClick={onClose}
          />
        </div>
        <div className="h-100">
          {users.length === 0 && (
            <p className="m-0 p-2 fs-2 text-center">no {title}</p>
          )}
          {users.map((user) => (
            <div
              key={user.id}
              className="d-flex gap-2 align-items-center p-2 h-100 overflow-auto"
              style={{ maxHeight: 300 }}
            >
              <Avatar src={user.avatar} alt="user-avatar"/>
              <div className="flex-fill">
                <Link
                  className="small text-body fw-medium"
                  to={`/profile/${user.id}`}
                  title="view profile"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {user.name}
                </Link>
                <p className="small text-body-secondary m-0">{user.username}</p>
              </div>
              <FollowButton to={user.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

UsersFollowersContainer.propTypes = {
  users: propTypes.array,
  title: propTypes.string,
  onClose: propTypes.func,
};

export default UsersFollowersContainer;
