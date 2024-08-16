import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { useGetPostComments } from "../../hooks";
import Loader from "../Loader/Loader";

const CommentsContainer = ({ postId }) => {
  const { data, isPending } = useGetPostComments(postId);
  if (isPending) return <Loader />;
  return (
    <div
      className="my-2 d-flex flex-column gap-3"
      style={{ maxHeight: 300, overflowY: "auto" }}
    >
      {data?.comments?.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

CommentsContainer.propTypes = {
  postId: PropTypes.number.isRequired,
};

const Comment = ({ comment }) => {
  return (
    <div className="d-flex align-items-start justify-content-start gap-2">
      <Avatar src={comment?.User.avatar} alt="user-avatar" />
      <div className="flex-fill px-2">
        <Link
          className="fw-medium text-body"
          title={comment?.User.name}
          to={`/profile/${comment?.User.id}`}
        >
          {comment?.User.name}
        </Link>
        <span className="text-break">{" " + comment?.content}</span>
      </div>
    </div>
  );
};
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default CommentsContainer;
