import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./src/pages/UserLogin";
import UserSignUp from "./src/pages/UserSignUp";
import Home from "./src/pages/Home";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/Signup" element={<UserSignUp />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
