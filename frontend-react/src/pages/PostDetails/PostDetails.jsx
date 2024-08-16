import { Link, useParams } from "react-router-dom";
import { useGetPost } from "../../hooks/Query";
import Loading from "../Loading/Loading";
import moment from "moment";
import {
  AddComment,
  Avatar,
  CommentsContainer,
  PostStatus,
} from "../../components";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { CarouselContainer } from "../../containers";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const { data: post, isPending: postLoading } = useGetPost(id);

  if (postLoading) return <Loading />;
  return (
    <div className="w-100 p-4" id="post-details">
      <div className="container py-5 h-100">
        <div className="row h-100">
          <div className="col-md-6 p-0">
            <CarouselContainer media={post?.media} />
          </div>
          <div className="col-md-6 p-4 rounded-start-0 rounded d-flex flex-column h-100 overflow-auto">
            <div className="d-flex gap-2 align-items-center">
              <Link
                to={`/Profile/${post.User.id}`}
                className="d-flex align-items-start mb-3 gap-2 flex-fill"
              >
                <Avatar src={post.User.avatar} alt="User Avatar" />

                <div className="d-flex flex-column gap-1">
                  <p className="mb-0 mt-2 small text-body fw-medium">
                    {post?.User?.name}
                    {" - "}
                    <span className="text-secondary fw-normal ">
                      {moment(post.createdAt).fromNow()}
                    </span>
                  </p>
                  <p className="mb-0 text-secondary small">
                    @{post?.User?.username}
                  </p>
                </div>
              </Link>
              {post.userId === user?.id && (
                <Link to={`/update-post/${post.id}`} className="text-body">
                  <CiEdit size={25} />
                </Link>
              )}
            </div>
            <div className="">
              <p>{post.caption}</p>
              <p>
                <strong>Location:</strong> {post.location}
              </p>
              <p className="link-primary fw-medium">#{post.tags.join(" # ")}</p>
            </div>

            <div className="flex-fill">
              <CommentsContainer postId={post?.id} />
            </div>
            <PostStatus post={post} />
            <div className="my-3">
              <AddComment postId={post?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
