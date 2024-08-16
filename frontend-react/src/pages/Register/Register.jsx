import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../../utils";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks";
import Loader from "../../components/Loader/Loader";
import { Fragment } from "react";
import { AuthHeading } from "../../components";

const Register = () => {
  const { mutateAsync, isPending } = useRegister();
  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  return (
    <Fragment>
      <AuthHeading
        title="Create a new account"
        paragraph="Sign up to see photos and videos from your friends."
      />
      <Formik
        initialValues={{ name: "", email: "", password: "", username: "" }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                id="email"
                type="email"
                name="email"
                required
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                required
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                required
                className={`form-control ${
                  errors.username && touched.username ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                required
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <p className="text-center text-secondary small">
              People who use our service may have uploaded <br /> your contact
              information to Instagram.
            </p>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              {isPending ? (
                <Loader variant="light" size="sm"/>
              ) : (
                <span className="fw-medium">Sign Up</span>
              )}
            </button>
            <p className="text-center">
              Already have an account?
              <Link className="link-primary fw-bold ms-1" to="/sign-in">
                Log In
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Register;
