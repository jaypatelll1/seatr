import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./src/pages/UserLogin";
import UserSignUo from "./src/pages/UserSignUp";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/Signup" element={<UserSignUo/>} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
