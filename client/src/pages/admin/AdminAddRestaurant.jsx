import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RestaurantProfile from "../../components/admin/RestaurantProfile";
import AdminNavbar from "../../components/admin/AdminNavbar";

function AdminAddRestaurant() {
  return (
    <div>
      <AdminNavbar />
      <div className="flex ">
        <AdminSidebar />
        <RestaurantProfile />
      </div>
    </div>
  );
}

export default AdminAddRestaurant;
