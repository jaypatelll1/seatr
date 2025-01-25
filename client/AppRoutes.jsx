import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./src/pages/UserLogin";
import UserSignUp from "./src/pages/UserSignUp";
import Home from "./src/pages/Home";
import UserViewRestaurant from "./src/pages/UserViewRestaurant";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/Signup" element={<UserSignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UserViewRestaurant" element={<UserViewRestaurant />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
