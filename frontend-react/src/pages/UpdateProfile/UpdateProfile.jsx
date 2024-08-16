import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userSchema } from "../../utils";
import { images } from "../../constants";
import { useUpdateUserByID } from "../../hooks";
import Loading from "../Loading/Loading";
import { useState } from "react";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user.user);
  const [enableEditOnPassword, setEnableEditOnPassword] = useState(false);
  const { mutate, isPending } = useUpdateUserByID();
  const initialValues = {
    avatar: user.avatar || "",
    name: user.name || "",
    bio: user.bio || "",
    password: "",
    file: undefined,
  };

  const onSubmit = (data) => {
    mutate({ ...data, id: user.id });
  };

  if (isPending) return <Loading />;
  return (
    <div className="w-100 p-4">
      <div className="container">
        <div className="d-flex align-items-center gap-2 mb-4">
          <h6 className="m-0">edit profile</h6>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue, errors, touched }) => (
            <Form>
              <div className="mb-3">
                <img
                  src={values.avatar || images.PROFILE_DEFAULT}
                  className="rounded-circle m-auto d-block object-fit-cover"
                  width={80}
                  height={80}
                  alt="user"
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="file">
                  Change Avatar
                </label>

                <input
                  type="file"
                  id="file"
                  name="file"
                  className="form-control"
                  onChange={(event) =>
                    setFieldValue("file", event.currentTarget.files[0])
                  }
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="bio">
                  Bio
                </label>
                <Field
                  as="textarea"
                  id="bio"
                  style={{ resize: "none", height: "200px" }}
                  name="bio"
                  className={`form-control ${
                    errors.bio && touched.bio ? "is-invalid" : ""
                  }`}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="password">
                  New Password
                </label>

                <div className="input-group mb-3">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    disabled={!enableEditOnPassword}
                  />
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-secondary rounded-0"
                      type="button"
                      onClick={() => {
                        setEnableEditOnPassword((prev) => !prev);
                        setFieldValue("password", "");
                      }}
                    >
                      {enableEditOnPassword ? "disable edit" : "enable Edit"}
                    </button>
                  </div>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="d-flex justify-content-end mt-4 gap-3">
                <button
                  type="reset"
                  className="btn btn-outline-secondary mr-2 fw-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-primary fw-bold"
                  disabled={
                    isSubmitting ||
                    errors.password ||
                    (!values.password && enableEditOnPassword)
                  }
                >
                  Update Profile
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;
