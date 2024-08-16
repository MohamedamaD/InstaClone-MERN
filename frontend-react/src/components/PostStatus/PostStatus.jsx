import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

import { useMemo } from "react";

import {
  useLikePost,
  useSavePost,
  useUnLikePost,
  useUnSavePost,
} from "../../hooks/Query";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PostStatus = ({ post, children }) => {
  const currentUser = useSelector((state) => state.user.user);

  const isLiked = useMemo(
    () => post.Likes.some((user) => user.userId === currentUser?.id),
    [post.Likes, currentUser?.id]
  );
  const isSave = useMemo(
    () => post.Saves.some((user) => user.userId === currentUser?.id),
    [post.Saves, currentUser?.id]
  );

  const { mutate: likePost } = useLikePost();
  const { mutate: unLikePost } = useUnLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: unSavePost } = useUnSavePost();

  const handleLike = (event) => {
    event.preventDefault();
    event.stopPropagation();
    likePost(post.id);
  };
  const handleUnLike = (event) => {
    event.preventDefault();
    event.stopPropagation();
    unLikePost(post.id);
  };
  const handleSave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    savePost(post.id);
  };
  const handleUnSave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    unSavePost(post.id);
  };
  return (
    <div className="">
      <div className="status-container d-flex justify-content-between align-items-center gap-3 pt-3 mb-2">
        {/* likes */}
        <div className="pointer text-danger d-flex align-items-center gap-1">
          {isLiked ? (
            <IoMdHeart size={25} title="Un Like" onClick={handleUnLike} />
          ) : (
            <IoIosHeartEmpty size={25} title="Like" onClick={handleLike} />
          )}
        </div>

        <div className="flex-fill">{children} </div>

        {/* saves */}
        <div className="pointer">
          {isSave ? (
            <FaBookmark title="Un Save Post" size={25} onClick={handleUnSave} />
          ) : (
            <CiBookmarkPlus title="Save Post" size={25} onClick={handleSave} />
          )}
        </div>
      </div>
      <div className="">
        <p className="small m-0 text-body fw-medium" title="likes">
          {post.Likes.length} likes
        </p>
      </div>
    </div>
  );
};
PostStatus.propTypes = {
  post: PropTypes.object,
  children: PropTypes.node,
};
export default PostStatus;
