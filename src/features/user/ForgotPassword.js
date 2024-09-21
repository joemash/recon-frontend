import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";

function ForgotPassword() {
  const INITIAL_USER_OBJ = {
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (userObj.emailId.trim() === "")
      return setErrorMessage("Email is required! (use any value)");
    else {
      setLoading(true);
      // Call API to send password reset link
      setLoading(false);
      setLinkSent(true);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl mx-auto">
        <div className="bg-base-100 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Forgot Password
          </h2>
          {linkSent ? (
            <>
              <div className="text-center mt-8">
                <CheckCircleIcon className="inline-block w-32 text-success" />
              </div>
              <p className="my-4 text-xl font-bold text-center">Link Sent</p>
              <p className="mt-4 mb-8 font-semibold text-center">
                Check your email to reset password
              </p>
              <div className="text-center mt-4">
                <Link to="/login">
                  <button className="btn btn-block btn-primary">Login</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="my-8 font-semibold text-center">
                We will send password reset link on your email
              </p>
              <form onSubmit={(e) => submitForm(e)}>
                <div className="mb-4">
                  <InputText
                    type="email"
                    defaultValue={userObj.emailId}
                    updateType="emailId"
                    containerStyle="mt-4"
                    labelTitle="Email"
                    updateFormValue={updateFormValue}
                  />
                </div>
                <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                <button
                  type="submit"
                  className={`btn mt-6 w-full btn-primary ${
                    loading ? "loading" : ""
                  }`}
                >
                  Send Reset Link
                </button>
                <div className="text-center mt-4">
                  Don't have an account yet?{" "}
                  <Link to="/register">
                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                      Register
                    </span>
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
