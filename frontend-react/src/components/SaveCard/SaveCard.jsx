import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { GetThumbnail } from "../../services/cloudinary";
import Avatar from "../Avatar/Avatar";

const SaveCard = ({ save }) => {
  return (
    <div className="h-100 position-relative">
      <Link to={`/posts/${save.Post.id}`} className="d-block h-100">
        <img
          src={GetThumbnail(save.Post.media[0].src)} // or save.Post.media[0].src when uploaded as test image 
          className="img-fluid w-100 object-fit-cover h-100"
          alt="Post"
          style={{ borderRadius: "10px" }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
          style={{ background: "linear-gradient(transparent,black)" }}
        ></div>
      </Link>

      <div className="position-absolute bottom-0 start-0 w-100 py-3 px-4 d-flex align-items-center">
        <Link to={`/Profile/${save.Post.User.id}`}>
          <Avatar alt="User Avatar" src={save.Post.User.avatar} />
        </Link>
      </div>
    </div>
  );
};

SaveCard.propTypes = {
  save: PropTypes.object.isRequired,
};

export default SaveCard;
