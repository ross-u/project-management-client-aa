// src/pages/LoginPage.js

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = { email, password };

      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      console.log("JWT token", response.data.authToken);

      // Save the token and set the user as logged in ...

      navigate("/");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
