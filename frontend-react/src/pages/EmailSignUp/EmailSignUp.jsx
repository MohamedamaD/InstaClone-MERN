import { ErrorMessage, Field, Formik, Form } from "formik";
import { otpSchema } from "../../utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { useEffect } from "react";
import { useVerifyOTP } from "../../hooks";

const initialValues = {
  otpCode: "",
};
const EmailSignUp = () => {
  const state = useLocation().state;
  const go = useNavigate();

  const { isPending, mutateAsync } = useVerifyOTP();
  const onSubmit = async (data) => {
    await mutateAsync({ ...data, email: state.email });
  };

  useEffect(() => {
    if (!state) {
      go("/sign-up", { replace: true });
    }
  }, [state, go]);
  return (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div
          className="border rounded"
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <div className="p-4">
            <h5 className="text-center">Confirm OTP Code</h5>
            <p className="text-center">Enter the code we sent to </p>
            <Formik
              initialValues={initialValues}
              validationSchema={otpSchema}
              onSubmit={onSubmit}
            >
              {({ touched, errors, values, isValid }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="otpCode" className="form-label text-start">
                      Code
                    </label>
                    <Field
                      type="text"
                      name="otpCode"
                      id="otpCode"
                      required
                      className={`form-control ${
                        errors.otpCode && touched.otpCode ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="otpCode"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!values.otpCode || !isValid}
                    className="btn btn-primary w-100 mb-3"
                  >
                    {isPending ? (
                      <Loader />
                    ) : (
                      <span className="fw-bold">Confirm Code</span>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <Link
            to="/sign-up"
            className="text-center d-block p-2 bg-body-secondary link-body-emphasis"
          >
            Back to sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailSignUp;
