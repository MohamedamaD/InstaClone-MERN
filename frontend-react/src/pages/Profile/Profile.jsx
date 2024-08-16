import { Link, useParams } from "react-router-dom";
import { useGetUserByID } from "../../hooks";
import { images } from "../../constants";
import { CiGrid41 } from "react-icons/ci";

import { LuPen } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { GetThumbnail } from "../../services/cloudinary";
import { FollowButton } from "../../components";
import { UsersFollowersContainer } from "../../containers";

const Profile = () => {
  const [floatingPanel, setFloatingPanel] = useState("");
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const { data } = useGetUserByID(id);
  const isMe = useMemo(
    () => user?.id === data?.user?.id,
    [user?.id, data?.user?.id]
  );

  const openFloatingPanel = useCallback((title) => {
    setFloatingPanel(title);
  }, []);
  const closeFloatingPanel = useCallback(() => {
    setFloatingPanel("");
  }, []);

  return (
    <>
      <div className="w-100 p-4 py-5">
        <div className="container">
          {/* user information */}
          <div className="d-flex flex-column flex-md-row gap-4 mb-4">
            {/* image profile */}
            <div className="" style={{ width: 250, margin: "auto" }}>
              <img
                src={data?.user?.avatar ?? images.PROFILE_DEFAULT}
                className="rounded-circle object-fit-cover m-auto d-block"
                width={120}
                height={120}
                alt="User Avatar"
              />
            </div>
            {/* text information */}
            <div className="d-flex flex-column gap-2 flex-fill">
              <div className="">
                <p className="mb-0 mt-2 fs-5">{data?.user?.name}</p>
                <p className="mb-0 fs-6 text-secondary">
                  @{data?.user?.username}
                </p>
              </div>
              <div className="d-flex gap-5">
                <p className="small m-0">
                  <span className="fw-bold fs-5">{data?.posts?.length}</span>{" "}
                  Posts
                </p>
                <p
                  className="small m-0 pointer"
                  title="Followers"
                  onClick={() => openFloatingPanel("Followers")}
                >
                  <span className="fw-bold fs-5">
                    {data?.user?.Followers?.length}
                  </span>{" "}
                  followers
                </p>
                <p
                  className="small m-0 pointer"
                  title="Following"
                  onClick={() => openFloatingPanel("Following")}
                >
                  <span className="fw-bold fs-5">
                    {data?.user?.Following?.length}
                  </span>{" "}
                  following
                </p>
              </div>
              <p className="m-0 flex-fill">{data?.user?.bio ?? "bio"}</p>
            </div>
            {!isMe && <FollowButton to={parseInt(id)} />}
          </div>
          {/* user options */}
          {isMe && (
            <div className="mb-4 d-flex align-items-center">
              <Link to="/update-profile">
                <CustomButton>
                  <LuPen size={15} />
                  <span>edit profile</span>
                </CustomButton>
              </Link>
            </div>
          )}
          {/* controllers */}
          <div className="d-flex mb-4 border-top align-items-center justify-content-center">
            <p className="d-flex align-items-center gap-2 py-3 px-2 border-top border-body m-0 pointer">
              <CiGrid41 size={15} />
              <span className="fw-medium small">posts</span>
            </p>
          </div>
          {/* posts */}
          <div className="row">
            {data?.posts?.length <= 0 && (
              <p className="text-center fs-3">
                <span>no posts</span>
              </p>
            )}
            {data?.posts?.map((post) => (
              <div key={post.id} className="col-12 col-sm-6 col-lg-4 mb-4">
                <Link
                  to={`/posts/${post.id}`}
                  title={post.caption}
                  className="d-block h-100"
                >
                  <img
                    src={GetThumbnail(post?.media[0]?.src)} // or save.Post.media[0].src when uploaded as test image
                    className="img-fluid h-100 object-fit-cover"
                    alt="Post"
                    style={{ borderRadius: "10px" }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {floatingPanel === "Followers" && (
        <UsersFollowersContainer
          title={"Followers"}
          users={data?.user?.Followers}
          onClose={closeFloatingPanel}
        />
      )}
      {floatingPanel === "Following" && (
        <UsersFollowersContainer
          title={"Following"}
          users={data?.user?.Following}
          onClose={closeFloatingPanel}
        />
      )}
    </>
  );
};

export default Profile;
