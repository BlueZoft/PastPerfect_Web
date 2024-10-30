import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { sha256 } from 'crypto-js';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const SignUp = ({ setUser }) => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email || !username || !password) {
        setErrorMessage("Email, Username, and Password fields are required!");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      // Basic password strength check
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", sha256(password).toString()); // Hash password
      formData.append("newsletter", newsletter);

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
        setErrorMessage("An error occurred during registration.");
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response) {
        switch (error.response.status) {
          case 409:
            setErrorMessage("This email is already associated with an account.");
            break;
          case 400:
            setErrorMessage("Invalid registration data.");
            break;
          default:
            setErrorMessage("An error occurred. Please try again later.");
        }
      } else {
        setErrorMessage("Unable to connect to the server. Please check your connection.");
      }
    }
  };

  return (
    <div className="signup-container container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          value={username}
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />

        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        {/* UPLOAD IMAGE */}
        <div className="file-select">
          {avatar ? (
            <div className="dashed-preview-image">
              <img src={preview} alt="Avatar preview" />
              <div
                className="remove-img-button"
                onClick={() => {
                  setAvatar("");
                  setPreview("");
                }}
              >
                X
              </div>
            </div>
          ) : (
            <div>
              <div className="dashed-preview-without">
                <div className="input-upload">
                  <label htmlFor="file" className="input-label">
                    <span className="input-sign">+</span>{" "}
                    <span>Add a photo</span>
                  </label>
                </div>
                <input
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  onChange={(event) => {
                    setAvatar(event.target.files[0]);
                    setPreview(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {/* END UPLOAD IMAGE */}
        <br />
        <div className="checkbox-container">
          <div>
            <input
              type="checkbox"
              onChange={(event) => setNewsletter(event.target.checked)}
            />
            <span>Subscribe to our newsletter</span>
          </div>
          <p>
            By signing up, I confirm that I have read and accepted the Terms &
            Conditions and Privacy Policy. I confirm that I am at least 18 years old.
          </p>
        </div>
        <br />
        <button type="submit">Sign Up</button>
        <span>{errorMessage}</span>
      </form>
      <Link to={`/login`}>Already have an account? Log in!</Link>
    </div>
  );
};

export default SignUp;