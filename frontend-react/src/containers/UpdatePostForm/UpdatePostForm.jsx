import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { UpdatePostSchema } from "../../utils";
import { AiOutlineDelete } from "react-icons/ai";

const UpdatePostForm = ({ action, post, deleteAction }) => {
  const initialValues = {
    caption: post?.caption || "",
    location: post?.location || "",
    tags: post?.tags || [],
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdatePostSchema}
        onSubmit={action}
      >
        {({ errors, touched, setFieldValue }) => (
          <div className="">
            <Form className="d-flex gap-2 flex-column flex-md-row">
              <div className="flex-fill">
                {/* caption */}
                <div className="mb-3">
                  <label htmlFor="caption" className="form-label">
                    caption
                  </label>
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
                  <label htmlFor="location" className="form-label">
                    location
                  </label>

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
                  <label htmlFor="tags" className="form-label">
                    tags
                  </label>
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
                  <div className="d-flex gap-2 align-items-center ">
                    <button
                      type="submit"
                      className="btn btn-outline-primary w-100"
                    >
                      <span className="fw-bold">Update</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={deleteAction}
                    >
                      <AiOutlineDelete size={25} />
                    </button>
                    <button type="reset" className="btn btn-outline-warning ">
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

UpdatePostForm.propTypes = {
  action: PropTypes.func,
  deleteAction: PropTypes.func,
  post: PropTypes.object,
};

export default UpdatePostForm;
