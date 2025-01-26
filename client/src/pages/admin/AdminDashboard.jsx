import React from "react";
import Navbar from "../../components/Navbar";
import RestaurantList from "../../components/admin/RestaurantList";

function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <RestaurantList />
    </div>
  );
}

export default AdminDashboard;
