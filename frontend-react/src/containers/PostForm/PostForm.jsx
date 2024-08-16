import { Formik, Form, Field, ErrorMessage } from "formik";
import { PostSchema } from "../../utils";
import { TfiGallery } from "react-icons/tfi";

import PropTypes from "prop-types";
import { useRef } from "react";
import { CarouselContainer } from "../";

const PostForm = ({ action }) => {
  const uploadInput = useRef(null);
  const initialValues = {
    caption: "",
    location: "",
    tags: [],
    media: [],
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={PostSchema}
        onSubmit={action}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <div className="">
            {values.media.length > 0 && (
              <CarouselContainer media={values.media} />
            )}
            <Form className="d-flex gap-2 flex-column flex-md-row">
              <div
                className="flex-fill rounded pointer border d-flex align-items-center justify-content-center p-4 position-relative"
                onClick={() => uploadInput.current.click()}
              >
                {/* image */}
                <div className="text-center">
                  <TfiGallery size={50} className="mb-2" />
                  <p className="m-0">upload media here</p>
                  <ErrorMessage
                    name="media"
                    component="div"
                    className="invalid-feedback d-block my-2"
                    style={{ display: "block !important" }}
                  />
                </div>

                <div className="mb-3 d-none">
                  <input
                    type="file"
                    className="form-control"
                    name="media"
                    multiple={true}
                    ref={uploadInput}
                    id="media"
                    onChange={(event) =>
                      setFieldValue(
                        "media",
                        Array.from(event.currentTarget.files)
                      )
                    }
                  />
                  {values.image && (
                    <div className="mt-3 mw-100 d-flex justify-content-center">
                      <img
                        src={
                          typeof values.image === "string"
                            ? values.image
                            : URL.createObjectURL(values.image)
                        }
                        className="img-thumbnail"
                        width={600}
                        alt="post-image"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-fill">
                {/* caption */}
                <div className="mb-3">
                  <Field
                    as="textarea"
                    name="caption"
                    id="caption"
                    placeholder="write a caption"
                    required
                    style={{ resize: "none", height: "200px" }}
                    col="5"
                    className={`form-control ${
                      errors.caption && touched.caption ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="caption"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                {/* location */}
                <div className="mb-3">
                  <Field
                    id="location"
                    name="location"
                    type="text"
                    placeholder="add location"
                    required
                    className={`form-control ${
                      errors.location && touched.location ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                {/* tags */}
                <div className="mb-3">
                  <Field
                    id="tags"
                    name="tags"
                    type="text"
                    placeholder="add tags separated by comma"
                    onChange={(event) =>
                      setFieldValue(
                        "tags",
                        event.currentTarget.value.split(",")
                      )
                    }
                    required
                    className={`form-control ${
                      errors.tags && touched.tags ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="tags"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="">
                  <button
                    type="reset"
                    className="btn btn-outline-secondary w-100 mb-3"
                  >
                    <span className="fw-medium">Cancel</span>
                  </button>

                  <button type="submit" className="btn btn-primary w-100">
                    <span className="fw-medium">Share</span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

PostForm.propTypes = {
  action: PropTypes.func,
};

export default PostForm;
