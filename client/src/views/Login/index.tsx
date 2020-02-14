import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../queries";
import ErrorMessage from "../../components/ErrorMessage";

interface LoginData {
  data: Object;
  loading: boolean;
  error: Error;
}

const initialState = {
  username: "",
  password: ""
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);

  const login = (e: React.SyntheticEvent, loginUser: Function): void => {
    e.preventDefault();
    loginUser()
      .then((data: any) => {
        setForm(initialState);
        console.log("logging in", data);
        localStorage.setItem("token", data.data.loginUser.token);
      })
      .catch((error: Error) => console.error(error));
  };

  const togglePasswordMask = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { username, password } = form;
    return username && password;
  };

  const { username, password } = form;

  return (
    <div className="App">
      <h1>Login</h1>
      <Mutation<LoginData>
        variables={{ username, password }}
        mutation={LOGIN_USER}
      >
        {(loginUser, result) => {
          return (
            <form className="form" onSubmit={e => login(e, loginUser)}>
              <label htmlFor="username">User name</label> <br />
              <input
                type="text"
                name="username"
                value={username}
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

export default Login;
