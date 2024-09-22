import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { login } from './authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [loginObj, setLoginObj] = useState({
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (loginObj.email.trim() === '')
      return setErrorMessage('Email is required!');
    if (loginObj.password.trim() === '')
      return setErrorMessage('Password is required!');
    else {
      setLoading(true);
      dispatch(login(loginObj))
        .unwrap()
        .then( () => {
          setLoading(false);
          window.location.href = "/app/reconciliations"; 
          })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error);
        });
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl mx-auto">
        <div className="bg-base-100 rounded-xl p-8">
          <form onSubmit={(e) => submitForm(e)} className="w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <div className="mb-4">
              <InputText
                type="email"
                defaultValue={loginObj.email}
                updateType="email"
                containerStyle="mt-4"
                labelTitle="Email"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={loginObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />
            </div>
            <div className="text-right text-primary">
              <Link to="/forgot-password">
                <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Forgot Password?
                </span>
              </Link>
            </div>
            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
            <button
              type="submit"
              className={`btn mt-6 w-full btn-primary ${
                loading ? "loading" : ""
              }`}
            >
              Login
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
        </div>
      </div>
    </div>
  );
};

export default Login;