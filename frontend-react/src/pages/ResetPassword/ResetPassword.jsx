import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/Query";
import { Loader } from "../../components";
import { resetPasswordSchema } from "../../utils";

const initialValues = {
  password: "",
};

const ResetPassword = () => {
  const { mutateAsync, isPending } = useResetPassword();
  const [searchParams] = useSearchParams();

  const onSubmit = async (data, { resetForm }) => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    await mutateAsync({ ...data, email, token });
    resetForm();
  };

  return (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div
          className="border rounded"
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <div className="p-4">
            <h5 className="text-center">Reset Account Password</h5>
            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordSchema}
              onSubmit={onSubmit}
            >
              {({ touched, errors, values, isValid }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-start">
                      New Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
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
                  <button
                    type="submit"
                    disabled={!values.password || !isValid}
                    className="btn btn-primary w-100 mb-3"
                  >
                    {isPending ? (
                      <Loader size="sm" />
                    ) : (
                      <span className="fw-bold">Reset Password</span>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <Link
            to="/sign-in"
            className="text-center d-block p-2 bg-body-secondary link-body-emphasis"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
