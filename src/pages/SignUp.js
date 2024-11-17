import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const SignUp = ({ setUser }) => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email || !username || !password) {
        setErrorMessage("Email, Username, and Password fields are required!");
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password); // Send plain password

      const response = await axios.post(
        `${API_URL}/user/signup`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.token) {
        setUser(response.data.token, response.data._id);
        navigate("/");
      } else {
        setErrorMessage("Sign up failed");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      setErrorMessage("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="signup-container container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          aria-label="Email"
        />
        <br />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
          aria-label="Username"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          aria-label="Password"
        />
        <br />
        <input
          type="file"
          onChange={handleAvatarChange}
          aria-label="Avatar"
        />
        {preview && <img src={preview} alt="Avatar Preview" />}
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        <br />
        <span>{errorMessage}</span>
      </form>
      <Link to={`/login`}>Already have an account? Login!</Link>
    </div>
  );
};

export default SignUp;
