import React, { useEffect } from "react";
import { useNavigate, useRoutes } from 'react-router-dom';

// Pages
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
      setTimeout(() => navigate("/auth"), 0);
    }

    if (userIdFromStorage && window.location.pathname === '/auth') {
      setTimeout(() => navigate("/"), 0);
    }
  }, [currentUser, navigate, setCurrentUser]);

  const element = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/auth", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile", element: <Profile /> },
  ]);

  // Fallback debug message
  return element || <div>⚠️ No matching route found.</div>;
};

export default ProjectRoutes;