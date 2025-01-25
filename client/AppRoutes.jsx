import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./src/pages/Login";
import UserSignUp from "./src/pages/UserSignUp";
import UserLanding from "./src/pages/UserLanding";
import UserViewRestaurant from "./src/pages/UserViewRestaurant";
import UserTableBooking from "./src/pages/UserTableBooking";
import Slots from "./src/pages/Slots";
import AdminAddRestaurant from "./src/pages/admin/AdminAddRestaurant";
import ResetPassword from "./src/pages/ResetPassword";
import AdminDashboard from "./src/pages/admin/AdminDashboard";
import RestaurantDashboard from "./src/pages/restaurant/RestaurantDashboard";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/home" element={<UserLanding />} />
        <Route path="/viewrestaurant" element={<UserViewRestaurant />} />
        <Route path="/tablebooking" element={<UserTableBooking />} />
        <Route path="/slot" element={<Slots />} />
        {/* admin routes*/}
        <Route path="/profile" element={<AdminAddRestaurant />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        {/* restaurant routes*/}
        <Route path="/restaurantdashboard" element={<RestaurantDashboard />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
