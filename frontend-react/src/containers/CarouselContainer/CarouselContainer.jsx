import PropTypes from "prop-types";
import Carousel from "react-bootstrap/Carousel";
import "./CarouselContainer.css";
import React, { useMemo } from "react";
import { Video } from "../../components";

// eslint-disable-next-line react/display-name
const CarouselContainer = React.memo(({ media }) => {
  const isSingleMedia = useMemo(() => media?.length > 1, [media]);
  return (
    <Carousel
      className="mb-2 carousel-container"
      slide={false}
      touch={isSingleMedia}
      pause={isSingleMedia}
      keyboard={isSingleMedia}
      indicators={isSingleMedia}
      controls={isSingleMedia}
    >
      {media?.map((item, index) => (
        <Carousel.Item
          className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}
          key={index}
        >
          {item?.type?.includes("image") && (
            <img
              className="d-block w-100 object-fit-cover img-fluid"
              src={item.src ? item.src : URL.createObjectURL(item)}
              style={{ height: 350 }}
              alt={`slide ${index + 1}`}
            />
          )}
          {item?.type?.includes("video") && (
            <Video
              alt={`slide ${index + 1}`}
              src={item.src ? item.src : URL.createObjectURL(item)}
            />
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
});

CarouselContainer.propTypes = {
  media: PropTypes.array,
};

export default CarouselContainer;
