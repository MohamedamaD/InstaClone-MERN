import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { LiaCommentAlt } from "react-icons/lia";
import moment from "moment";
import { useMemo, useState } from "react";
import PostStatus from "../PostStatus/PostStatus";
import { CarouselContainer } from "../../containers";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../FollowButton/FollowButton";
import AddComment from "../AddComment/AddComment";
import CommentsContainer from "../CommentsContainer/CommentsContainer";
const PostCard = ({ post }) => {
  const currentUser = useSelector((state) => state.user.user);
  const [captionMaxLength, setCaptionMaxLength] = useState(40);
  const [isCommentsDisplayed, displayComments] = useState(false);

  const caption = useMemo(
    () => post?.caption?.slice(0, captionMaxLength),
    [captionMaxLength, post?.caption]
  );

  const remainCaption = useMemo(
    () => post?.caption?.slice(captionMaxLength) !== "",
    [captionMaxLength, post?.caption]
  );

  const isOwner = useMemo(
    () => post.userId === currentUser?.id,
    [post.userId, currentUser?.id]
  );

  return (
    <div className="rounded p-4 mb-2">
      {/* user */}
      <div className="d-flex align-items-center pb-1 gap-1">
        <Link
          to={`/Profile/${post.User.id}`}
          className="user flex-fill d-flex justify-content-between align-items-center gap-2"
        >
          <Avatar src={post.User.avatar} alt="Avatar" width={40} height={40} />

          <div className="flex-fill">
            <h6 className="m-0 h6 small text-body">
              <strong>{post.User.name}</strong>
              {" - "}
              <span className="text-secondary fw-normal small">
                {moment(post.createdAt).fromNow()}
              </span>
            </h6>
          </div>
        </Link>
        <FollowButton to={post.User.id} />

        {isOwner && (
          <Link to={`update-post/${post.id}`} className="text-body">
            <CiEdit size={25} />
          </Link>
        )}
      </div>
      {/* media */}
      <div className="pt-3">
        <CarouselContainer media={post?.media} />
      </div>
      {/* status */}
      <PostStatus post={post}>
        <LiaCommentAlt
          size={25}
          title="comments"
          className="pointer"
          onClick={() => displayComments((prev) => !prev)}
        />
      </PostStatus>
      {/* post info */}
      <div className="mb-1 m-0">
        <p className="text-body mb-0">
          <Link
            to={`/Profile/${post.User.id}`}
            className="fw-bold text-body me-1"
          >
            {post.User.name}
          </Link>

          {caption}
          {remainCaption && (
            <span
              className="fw-bold text-secondary pointer"
              onClick={() => {
                setCaptionMaxLength(post?.caption.length);
              }}
            >
              {" "}
              more...
            </span>
          )}
        </p>
        {/* tags */}
        <ul className="d-flex flex-wrap gap-1 p-0 mb-1">
          {post.tags.map((tag, index) => (
            <li key={index} className="d-flex link-primary">
              # <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* comments */}
      {isCommentsDisplayed && <CommentsContainer postId={post?.id} />}

      <div className="mt-2">
        <AddComment postId={post.id} />
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostCard;
