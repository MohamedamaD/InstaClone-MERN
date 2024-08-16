import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../utils";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks";
import { AuthHeading, Loader } from "../../components";
import { Fragment, useState } from "react";
const Login = () => {
  const [typeIsPassword, setTypePassword] = useState(true);
  const { mutate, isPending } = useLogin();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Fragment>
      <AuthHeading
        title="Log in to your account"
        paragraph="Welcome back, please enter your details"
      />
      <Formik
        initialValues={{ password: "", email: "" }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group mb-3">
                <Field
                  id="password"
                  name="password"
                  type={typeIsPassword ? "password" : "text"}
                  required
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary rounded-0"
                    type="button"
                    onClick={() => setTypePassword((prev) => !prev)}
                  >
                    {typeIsPassword ? "show" : "hide"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3 fw-bold"
            >
              {isPending ? <Loader size="sm" /> : <span>Log in</span>}
            </button>
            <Link
              to={"/forgot-password"}
              className="text-center small text-center d-block mb-2 fw-medium"
            >
              Forgot password?
            </Link>
            <p className="text-center">
              Do not have an account?
              <Link className=" link-primary fw-bold ms-1" to="/sign-up">
                Sign Up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Login;
