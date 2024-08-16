import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GetThumbnail } from "../../services/cloudinary";
import { Avatar } from "../../components";
const PostList = ({ posts, displayUser = false }) => {
  return (
    <div className="container">
      <div className="row">
        {posts?.map((post) => (
          <div
            className="col-12 col-md-6 col-xl-4 mb-2 px-1"
            // style={{maxHeight: "500px"}}
            key={post?.id}
          >
            <Link
              to={`/posts/${post?.id}`}
              className="post position-relative d-block w-100 h-100"
            >
              <img
                src={GetThumbnail(post?.media[0].src)} // or save.Post.media[0].src when uploaded as test image
                className="rounded-3 d-block object-fit-cover w-100"
                alt="post-image"
                style={{ height: "100%" }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
                style={{ background: "linear-gradient(transparent,black)" }}
              ></div>
              <div className="position-absolute bottom-0 start-0 w-100 px-3 py-4 d-flex align-items-center justify-content-between">
                {displayUser && (
                  <div className="d-flex align-items-center gap-2">
                    <Avatar src={post?.User?.avatar} alt="Avatar" />

                    <div>
                      <h6
                        className="m-0 text-white"
                        style={{ wordBreak: "break-all" }}
                      >
                        {post?.User?.name}
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  displayUser: PropTypes.bool,
  displayStatus: PropTypes.bool,
};

export default PostList;
