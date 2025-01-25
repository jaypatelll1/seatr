import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./src/pages/UserLogin";
import UserSignUp from "./src/pages/UserSignUp";
import UserLanding from "./src/pages/UserLanding";
import UserViewRestaurant from "./src/pages/UserViewRestaurant";
import UserTableBooking from "./src/pages/UserTableBooking";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/home" element={<UserLanding />} />
        <Route path="/viewrestaurant" element={<UserViewRestaurant />} />
        <Route path="/tablebooking" element={<UserTableBooking />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
