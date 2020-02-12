import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const togglePasswordMask = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const signup = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    console.log("signing up", form);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Signup</h1>
      <Mutation mutation={SIGNUP_USER}>
        {() => {
          return (
            <form className="form" onSubmit={signup}>
              <label htmlFor="username">User name</label> <br />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleFormChange}
              />
              <br /> <br />
              <label htmlFor="email">Email</label> <br />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
              />
              <br /> <br />
              <label htmlFor="password">Password</label> <br />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleFormChange}
              />
              <button onClick={togglePasswordMask}>Mask</button>
              <br />
              <br />
              <button type="submit">Send</button>
            </form>
          );
        }}
      </Mutation>
    </div>
  );
};

export default Signup;
