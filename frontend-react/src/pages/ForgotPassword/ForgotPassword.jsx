/* eslint-disable react/no-unescaped-entities */
import { Formik, Field, ErrorMessage, Form } from "formik";
import { emailSchema } from "../../utils";
import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../../hooks/Query";
import { Loader } from "../../components";

const initialValues = {
  email: "",
};
const ForgotPassword = () => {
  const { mutateAsync, isPending } = useForgotPassword();
  const onSubmit = async (data, { resetForm }) => {
    await mutateAsync(data);
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
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <CiLock size={60} />
              <h5>Trouble logging in?</h5>
              <p className="text-center small text-secondary">
                Enter your email, phone, or username and <br /> we'll send you a
                link to get back into your account.
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={emailSchema}
              onSubmit={onSubmit}
            >
              {({ touched, errors, values, isValid }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-start">
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
                  <button
                    type="submit"
                    disabled={!values.email || !isValid}
                    className="btn btn-primary w-100 mb-3"
                  >
                    {isPending ? (
                      <Loader size="sm"/>
                    ) : (
                      <span className="fw-bold">send login link</span>
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
            back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
