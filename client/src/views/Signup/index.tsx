import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import ErrorMessage from "../../components/ErrorMessage";

interface SignUpData {
  data: Object;
  loading: boolean;
  error: Error;
}

interface SignUpVariables {
  username: string;
  email: string;
  password: string;
}

const initialState = {
  username: "",
  email: "",
  password: ""
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);

  const togglePasswordMask = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const signup = (e: React.SyntheticEvent, signupUser: Function): void => {
    e.preventDefault();
    signupUser()
      .then((data: Object) => {
        setForm(initialState);
        console.log("signing up", data);
      })
      .catch((error: Error) => console.error(error));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { username, email, password } = form;
    return username && email && password && password.length >= 8;
  };

  const { username, email, password } = form;

  return (
    <div className="App">
      <h1>Signup</h1>
      <Mutation<SignUpData>
        variables={{ username, email, password }}
        mutation={SIGNUP_USER}
      >
        {(signupUser, result) => {
          return (
            <form className="form" onSubmit={e => signup(e, signupUser)}>
              <label htmlFor="username">User name</label> <br />
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleFormChange}
              />
              <br /> <br />
              <label htmlFor="email">Email</label> <br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleFormChange}
              />
              <br /> <br />
              <label htmlFor="password">Password</label> <br />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleFormChange}
              />
              <button onClick={togglePasswordMask}>Mask</button>
              {password && password.length < 8 && (
                <small>
                  <br />
                  Password must be at least 8 characters
                </small>
              )}
              <br />
              <br />
              <button disabled={result.loading || !isFormValid} type="submit">
                Send
              </button>
              {result.error && <ErrorMessage error={result.error} />}
            </form>
          );
        }}
      </Mutation>
    </div>
  );
};

export default Signup;
