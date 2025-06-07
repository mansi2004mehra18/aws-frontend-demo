import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import { Box, Button, PageHeader } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate(); // instead of window.location.href

  useEffect(() => {
    // Clear any previous session if coming from logout
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
  }, [setCurrentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      navigate("/"); // navigate instead of hard reload
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Login Failed!");
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
                <PageHeader.Title>Sign In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

        <form className="login-box" onSubmit={handleLogin}>
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
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
