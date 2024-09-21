import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { registerUser } from './authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [registerObj, setRegisterObj] = useState({
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (registerObj.email.trim() === '')
      return setErrorMessage('Email is required!');
    if (registerObj.password.trim() === '')
      return setErrorMessage('Password is required!');
    else {
      setLoading(true);
      dispatch(registerUser(registerObj))
        .unwrap()
        .then(() => {
          setLoading(false);
          window.location.href = '/app/reconciliations';
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error.message);
        });
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl mx-auto">
        <div className="bg-base-100 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="mb-4"> 
              <InputText
                defaultValue={registerObj.email}
                updateType="email"
                containerStyle="mt-4"
                labelTitle="Email"
                updateFormValue={updateFormValue}
              />
              <InputText
                defaultValue={registerObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
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
              Register
            </button>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login">
                <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                  Login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;