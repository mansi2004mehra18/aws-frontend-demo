import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import { Box, Button, PageHeader } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/signup", {
        email,
        password,
        username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      navigate("/"); // better than window.location.href
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.response?.data?.message || "Signup Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign Up</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

        <form className="login-box" onSubmit={handleSignup}>
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="username"
              id="username"
              className="input"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="email"
              id="email"
              className="input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="password"
              id="password"
              className="input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Signup"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
