import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = () => <h1>Dashboard Working ✅</h1>;
const Login = () => <h1>Login Page</h1>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Login />} />
    </Routes>
  );
}

export default App;